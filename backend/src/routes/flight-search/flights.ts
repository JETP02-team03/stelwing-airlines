// backend/src/routes/flight-search/flights.ts
import { Router, type Request, type Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

const SearchSchema = z.object({
  origin: z.string().length(3),
  destination: z.string().length(3),
  depart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
});

router.get("/search", async (req: Request, res: Response) => {
  const parsed = SearchSchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { origin, destination, depart } = parsed.data;

  const targetDate = new Date(depart); // 你的 seed 就是用 new Date('YYYY-MM-DD')

  const flights = await prisma.flight.findMany({
    where: {
      originIata: origin,
      destinationIata: destination,
      flightDate: targetDate,
    },
    orderBy: [{ depTimeUtc: "asc" }],
    take: 50,
  });

  const dto = flights.map((f) => {
    const dep = new Date(f.depTimeUtc as any);
    const arr = new Date(f.arrTimeUtc as any);
    const durationMinutes = Math.max(0, Math.round((arr.getTime() - dep.getTime()) / 60000));

    return {
      flightId:
        (f as any).flightId ??
        (f as any).id ??
        `${f.flightNumber}-${(f.flightDate as Date).toISOString()}`,
      flightNo: f.flightNumber,
      carrier: "Stelwing Airlines", // 你的 schema 暫無 carrier，先給固定字串
      origin: f.originIata,
      destination: f.destinationIata,
      departTime: f.depTimeUtc,
      arriveTime: f.arrTimeUtc,
      durationMinutes,
      // 目前 schema 無艙等/票價就先不輸出，有的時候再補
      cabinClass: undefined,
      price: undefined,
      currency: "TWD",
      status: f.status,
    };
  });

  res.json({ outbounds: dto });
});

export default router;
