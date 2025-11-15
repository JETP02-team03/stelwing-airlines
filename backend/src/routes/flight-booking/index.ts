import { Router } from "express";
import { prisma } from "../../utils/prisma-only.js";
import moment from "moment-timezone";
import { z } from "zod";

const router = Router();

/* ===================== 小工具 ===================== */
function safeTz(tz: string, fallback: string) {
  return moment.tz.zone(tz) ? tz : fallback;
}
const CurrencyQuery = z.object({
  currency: z
    .string()
    .trim()
    .toUpperCase()
    .length(3)
    .optional()
    .default("TWD"),
});

/* 新增：座位查詢參數 */
const SeatQuery = z.object({
  flightId: z
    .string()
    .regex(/^\d+$/, "flightId must be a positive integer string"),
  onlyAvailable: z
    .union([z.string(), z.number(), z.boolean()])
    .optional()
    .transform((v) => (v === "1" || v === 1 || v === true)),
});

/* ===================== 固定路由（放前面） ===================== */
/** 列表：GET /list?originZone=Asia/Taipei&destZone=Asia/Tokyo */
router.get("/list", async (req, res) => {
  const originZone = safeTz(String(req.query.originZone ?? "Asia/Taipei"), "Asia/Taipei");
  const destZone = safeTz(String(req.query.destZone ?? "Asia/Tokyo"), "Asia/Tokyo");

  try {
    const rows = await prisma.flight.findMany({
      orderBy: [{ flightDate: "asc" }, { flightNumber: "asc" }],
    });

    const data = rows.map((f) => ({
      // 如需避免 BigInt JSON 問題，這裡可轉字串
      flightId: String(f.flightId),
      flightNumber: f.flightNumber,
      flightDate: f.flightDate, // 出發地「日期」
      originIata: f.originIata,
      destinationIata: f.destinationIata,
      status: f.status,

      // DB 內原始 UTC（除錯用）
      depUtcISO: f.depTimeUtc ? moment(f.depTimeUtc).utc().toISOString() : null,
      arrUtcISO: f.arrTimeUtc ? moment(f.arrTimeUtc).utc().toISOString() : null,

      // 轉回當地時區（顯示用）
      depLocalDisplay: f.depTimeUtc
        ? moment(f.depTimeUtc).tz(originZone).format("YYYY-MM-DD HH:mm")
        : null,
      arrLocalDisplay: f.arrTimeUtc
        ? moment(f.arrTimeUtc).tz(destZone).format("YYYY-MM-DD HH:mm")
        : null,
    }));

    res.json({ originZone, destZone, count: data.length, data });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "讀取航班清單失敗",
      error: err?.message ?? String(err),
    });
  }
});

/** 行李加購：GET /baggage-options?currency=TWD */
router.get("/baggage-options", async (req, res) => {
  const parsed = CurrencyQuery.safeParse({
    currency: typeof req.query.currency === "string" ? req.query.currency : undefined,
  });
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { currency } = parsed.data;

  try {
    const rows = await prisma.baggageOption.findMany({
      where: { currency },
      orderBy: [{ weightKg: "asc" }, { fee: "asc" }],
    });

    const data = rows.map((o) => ({
      baggageId: String(o.baggageId),
      weightKg: o.weightKg,
      fee: o.fee,
      currency: o.currency,
    }));

    res.json({ currency, count: data.length, data });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "取得行李加購失敗",
      error: err?.message ?? String(err),
    });
  }
});

/** 餐食加購：GET /meal-options?currency=TWD */
router.get("/meal-options", async (req, res) => {
  const parsed = CurrencyQuery.safeParse({
    currency: typeof req.query.currency === "string" ? req.query.currency : undefined,
  });
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { currency } = parsed.data;

  try {
    const rows = await prisma.mealOption.findMany({
      where: { currency },
      orderBy: [{ mealFee: "asc" }, { mealName: "asc" }],
    });

    const data = rows.map((o) => ({
      mealId: String(o.mealId),
      mealCode: o.mealCode,
      mealName: o.mealName,
      mealType: o.mealType ?? null,
      mealFee: o.mealFee,
      currency: o.currency,
      mealImagePath: o.mealImagePath ?? null,
    }));

    res.json({ currency, count: data.length, data });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "取得餐食加購失敗",
      error: err?.message ?? String(err),
    });
  }
});

/** 座位查詢：GET /seat-options?flightId=123&onlyAvailable=1 */
router.get("/seat-options", async (req, res) => {
  const parsed = SeatQuery.safeParse({
    flightId: typeof req.query.flightId === "string" ? req.query.flightId : undefined,
    onlyAvailable: req.query.onlyAvailable as any,
  });
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { flightId, onlyAvailable } = parsed.data;
  const fid = BigInt(flightId);

  try {
    // 可選：確認航班存在
    const exists = await prisma.flight.findUnique({ where: { flightId: fid } });
    if (!exists) return res.status(404).json({ message: "flight not found" });

    const seats = await prisma.seatOption.findMany({
      where: {
        flightId: fid,
        ...(onlyAvailable ? { isAvailable: true } : {}),
      },
      // 注意：seatNumber 為字串，單純字典排序會讓 '10A' 排在 '2A' 前
      // 若需要更精準的排序建議前端再排序或在 DB 使用更複雜的排序式。
      orderBy: [{ seatNumber: "asc" }],
    });

    const data = seats.map((s) => ({
      seatId: String(s.seatId),
      flightId: String(s.flightId),
      seatNumber: s.seatNumber,
      cabinClass: s.cabinClass,
      isAvailable: s.isAvailable,
      seatFee: s.seatFee,
    }));

    res.json({ flightId: String(fid), count: data.length, data });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "取得座位失敗",
      error: err?.message ?? String(err),
    });
  }
});

function genPNR(len = 6) {
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += A[Math.floor(Math.random() * A.length)];
  }
  return out;
}

const CreateBookingSchema = z.object({
  tripType: z.enum(["oneway", "roundtrip"]),
  currency: z.string().length(3).default("TWD"),

  // 旅客資訊
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.string().optional().nullable(),
  nationality: z.string().length(2).optional().nullable(),
  passportNo: z.string().optional().nullable(),

  cabinClass: z.string().min(1),

  totalAmount: z.number().nonnegative(),

  outbound: z.object({
    flightId: z.union([z.string(), z.number(), z.bigint()])
      .transform((v) => BigInt(v)),
    seats: z.array(
      z.object({
        seatId: z.union([z.string(), z.number(), z.bigint()])
          .transform((v) => BigInt(v)),
      })
    ).nonempty(),
    baggageId: z.union([z.string(), z.number(), z.bigint()])
      .optional()
      .nullable()
      .transform((v) => (v ? BigInt(v) : null)),
    mealId: z.union([z.string(), z.number(), z.bigint()])
      .optional()
      .nullable()
      .transform((v) => (v ? BigInt(v) : null)),
  }),

  inbound: z.object({
    flightId: z.union([z.string(), z.number(), z.bigint()])
      .transform((v) => BigInt(v)),
    seats: z.array(
      z.object({
        seatId: z.union([z.string(), z.number(), z.bigint()])
          .transform((v) => BigInt(v)),
      })
    ).nonempty(),
    baggageId: z.union([z.string(), z.number(), z.bigint()])
      .optional()
      .nullable()
      .transform((v) => (v ? BigInt(v) : null)),
    mealId: z.union([z.string(), z.number(), z.bigint()])
      .optional()
      .nullable()
      .transform((v) => (v ? BigInt(v) : null)),
  }).optional().nullable(),
});

/* ============================================
 * 🔥 建立訂單
 * ============================================ */
router.post("/bookings", async (req, res) => {
  const parsed = CreateBookingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }

  const data = parsed.data;
  const pnr = genPNR();

  try {
    const result = await prisma.$transaction(async (tx) => {
      /* ① 建 booking */
      const booking = await tx.booking.create({
        data: {
          pnr,

          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender ?? null,
          nationality: data.nationality ?? null,
          passportNo: data.passportNo ?? null,

          cabinClass: data.cabinClass,
          currency: data.currency,
          totalAmount: data.totalAmount,

          paymentStatus: "pending", // 你之後付款成功再改成 paid
        },
      });

      const bookingId = booking.bookingId;

      /* ② 建 BookingDetail：去程 */
      for (const seat of data.outbound.seats) {
        await tx.bookingDetail.create({
          data: {
            bookingId,
            flightId: data.outbound.flightId,
            tripType: "OB",
            seatId: seat.seatId,
            baggageId: data.outbound.baggageId ?? null,
            mealId: data.outbound.mealId ?? null,
          },
        });

        // 鎖定座位
        await tx.seatOption.update({
          where: { seatId: seat.seatId },
          data: { isAvailable: false },
        });
      }

      /* ③ 回程（如果有） */
      if (data.inbound) {
        for (const seat of data.inbound.seats) {
          await tx.bookingDetail.create({
            data: {
              bookingId,
              flightId: data.inbound.flightId,
              tripType: "IB",
              seatId: seat.seatId,
              baggageId: data.inbound.baggageId ?? null,
              mealId: data.inbound.mealId ?? null,
            },
          });

          await tx.seatOption.update({
            where: { seatId: seat.seatId },
            data: { isAvailable: false },
          });
        }
      }

      return { booking, pnr };
    });

    res.json({
      success: true,
      pnr,
      bookingId: String(result.booking.bookingId),
      totalAmount: result.booking.totalAmount,
    });
  } catch (err) {
    console.error("建立訂單失敗：", err);
    res.status(500).json({
      success: false,
      message: "建立訂單失敗",
      error: err ?? String(err),
    });
  }
});

/* ===================== 查詢訂單明細 GET /bookings/:pnr ===================== */
router.get("/bookings/:pnr", async (req, res) => {
  try {
    const pnr = req.params.pnr;

    const booking = await prisma.booking.findUnique({
      where: { pnr },
      include: {
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

    if (!booking) {
      return res.status(404).json({ success: false, message: "找不到訂單" });
    }

    res.json({ success: true, data: booking });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "查詢訂單失敗",
      error: onmessage,
    });
  }
});

/* ===================== 動態路由（放最後） ===================== */
/** 明細：GET /:id?originZone=...&destZone=... */
router.get("/:id", async (req, res) => {
  // BigInt 轉型＋防呆
  let flightId: bigint;
  try {
    flightId = BigInt(req.params.id);
  } catch {
    return res.status(400).json({ error: "Invalid flight id" });
  }

  const originZone = safeTz(String(req.query.originZone ?? "Asia/Taipei"), "Asia/Taipei");
  const destZone = safeTz(String(req.query.destZone ?? "Asia/Tokyo"), "Asia/Tokyo");

  try {
    const f = await prisma.flight.findUnique({ where: { flightId } });
    if (!f) return res.status(404).json({ error: "Flight not found" });

    res.json({
      ...f,
      flightId: String(f.flightId), // 避免 BigInt JSON 問題
      depUtcISO: f.depTimeUtc ? moment(f.depTimeUtc).utc().toISOString() : null,
      arrUtcISO: f.arrTimeUtc ? moment(f.arrTimeUtc).utc().toISOString() : null,
      depLocalDisplay: f.depTimeUtc
        ? moment(f.depTimeUtc).tz(originZone).format("YYYY-MM-DD HH:mm")
        : null,
      arrLocalDisplay: f.arrTimeUtc
        ? moment(f.arrTimeUtc).tz(destZone).format("YYYY-MM-DD HH:mm")
        : null,
      zones: { originZone, destZone },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "讀取航班明細失敗",
      error: err?.message ?? String(err),
    });
  }
});

export default router;
