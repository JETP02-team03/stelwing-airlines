import { Router, type Request, type Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import { z } from "zod";
import { serializeBigInt } from "../../utils/serializeBigInt.js";

const prisma = new PrismaClient();
const router = Router();


/* ---------------- Zod Schemas ---------------- */

// 每段航班明細
const DetailSchema = z.object({
  flightId: z.coerce.bigint().positive(),              // ← 自動把 string/number 轉 bigint
  tripType: z.enum(["outbound", "inbound"]).optional(),
  seatId: z.coerce.bigint().optional(),
  mealId: z.coerce.bigint().optional(),
  baggageId: z.coerce.bigint().optional(),
});

// 建立訂單
const CreateBookingSchema = z.object({
  memberId: z.coerce.bigint().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.string().optional(),
  nationality: z.string().length(2).optional(),
  passportNo: z.string().optional(),

  cabinClass: z.string().min(1),
  currency: z.string().length(3),
  totalAmount: z.coerce.number().int().nonnegative(), 
  paymentStatus: z.string().min(1),

  details: z.array(DetailSchema).min(1),

  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
});


/* ---------------- Helpers ---------------- */

// 產 PN R：簡易 6 碼英數
function genPNR(len = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// 座位可用性檢查 + 鎖定（is_available -> false）
// ※ 僅當 seatId 有提供時才檢查；會確保 seatOption 屬於同一個 flight 且可選
async function assertAndLockSeat(tx: PrismaClient, flightId: bigint, seatId?: bigint) {
  if (!seatId) return;
  const seat = await tx.seatOption.findUnique({ where: { seatId } });
  if (!seat) throw new Error("Seat not found");
  if (seat.flightId !== flightId) throw new Error("Seat does not belong to the given flight");
  if (!seat.isAvailable) throw new Error("Seat is not available");

  await tx.seatOption.update({
    where: { seatId },
    data: { isAvailable: false },
  });
}

/* ---------------- Main: 建立訂單 ---------------- */

// POST /api/flight-booking
router.post("/", async (req: Request, res: Response) => {
  try {
    const parsed = CreateBookingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.flatten());
    }
    const data = parsed.data;

    const result = await prisma.$transaction(async (tx) => {
      // 產生唯一 PNR（保守起見重複檢查）
      let pnr = genPNR();
      // 迴圈直到不重複（很少發生）
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const exists = await tx.booking.findUnique({ where: { pnr } });
        if (!exists) break;
        pnr = genPNR();
      }

      // 1) 建立 Booking
      const booking = await tx.booking.create({
        data: {
          pnr,
          memberId: data.memberId ?? null,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender ?? null,
          nationality: data.nationality ?? null,
          passportNo: data.passportNo ?? null,

          cabinClass: data.cabinClass,
          currency: data.currency,
          totalAmount: data.totalAmount, // 前端計好或你也可在後端加上 seat/meal/baggage 的加總
          paymentStatus: data.paymentStatus,
        },
      });

      // 2) 寫入 Details（逐筆確認 seats 可用，並鎖定）
      for (const d of data.details) {
        // 驗證該航班存在
        const flight = await tx.flight.findUnique({ where: { flightId: d.flightId } });
        if (!flight) throw new Error(`Flight ${d.flightId.toString()} not found`);

        // 若 seatId 有帶，檢查與鎖定
        await assertAndLockSeat(tx as any, d.flightId, d.seatId);

        await tx.bookingDetail.create({
          data: {
            bookingId: booking.bookingId,
            flightId: d.flightId,
            tripType: d.tripType ?? null,
            seatId: d.seatId ?? null,
            mealId: d.mealId ?? null,
            baggageId: d.baggageId ?? null,
          },
        });
      }

      // 3) 回傳完整資料（含關聯）
      const full = await tx.booking.findUnique({
        where: { bookingId: booking.bookingId },
        include: {
          member: true,
          details: {
            include: {
              flight: true,
              seat: true,
              meal: true,
              baggage: true,
            },
          },
        },
      });

      return full!;
    });

    return res.status(201).json(serializeBigInt(result));
  } catch (err: any) {
    console.error("[POST /api/flight-booking] error:", err);
    return res.status(500).json({ message: err?.message ?? "Create booking failed" });
  }
});

/* ---------------- Options for UI ---------------- */

// GET /api/seat-options?flightId=...
router.get("/seat-options", async (req: Request, res: Response) => {
  try {
    const fidRaw = req.query.flightId;
    if (!fidRaw) return res.status(400).json({ message: "flightId is required" });
    const flightId = BigInt(fidRaw as string);

    const rows = await prisma.seatOption.findMany({
      where: { flightId },
      orderBy: [{ seatNumber: "asc" }],
    });
    res.json(serializeBigInt(rows));
  } catch (err: any) {
    res.status(500).json({ message: err?.message ?? "seat options failed" });
  }
});

// GET /api/meal-options
router.get("/meal-options", async (_req: Request, res: Response) => {
  try {
    const rows = await prisma.mealOption.findMany({
      orderBy: [{ mealCode: "asc" }],
    });
    res.json(serializeBigInt(rows));
  } catch (err: any) {
    res.status(500).json({ message: err?.message ?? "meal options failed" });
  }
});

// GET /api/baggage-options
router.get("/baggage-options", async (_req: Request, res: Response) => {
  try {
    const rows = await prisma.baggageOption.findMany({
      orderBy: [{ weightKg: "asc" }],
    });
    res.json(serializeBigInt(rows));
  } catch (err: any) {
    res.status(500).json({ message: err?.message ?? "baggage options failed" });
  }
});

router.get("/:pnr", async (req, res) => {
  try {
    const { pnr } = req.params;
    if (!pnr) return res.status(400).json({ message: "pnr is required" });

    const row = await prisma.booking.findUnique({
      where: { pnr },
      include: {
        member: true,
        details: {
          include: {
            flight: true,
            seat: true,
            meal: true,
            baggage: true,
          },
        },
      },
    });

    if (!row) return res.status(404).json({ message: "Booking not found" });

    return res.json(serializeBigInt(row));
  } catch (err: any) {
    console.error("[GET /api/flight-booking/:pnr] error:", err);
    return res.status(500).json({ message: err?.message ?? "read booking failed" });
  }
});

export default router;