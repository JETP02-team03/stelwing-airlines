import { Router } from "express";
import { prisma } from "../../utils/prisma-only.js"
import moment from "moment-timezone";

const router = Router();

/** 列表：?originZone=Asia/Taipei&destZone=Asia/Tokyo */
router.get("/list", async (req, res) => {
  const originZone = String(req.query.originZone ?? "Asia/Taipei");
  const destZone   = String(req.query.destZone   ?? "Asia/Tokyo");

  const rows = await prisma.flight.findMany({
    orderBy: [{ flightDate: "asc" }, { flightNumber: "asc" }],
  });

  const data = rows.map(f => ({
    flightId:        f.flightId,
    flightNumber:    f.flightNumber,
    flightDate:      f.flightDate, // 出發地「日期」
    originIata:      f.originIata,
    destinationIata: f.destinationIata,
    status:          f.status,

    // DB 內原始 UTC（除錯用）
    depUtcISO: f.depTimeUtc ? moment(f.depTimeUtc).utc().toISOString() : null,
    arrUtcISO: f.arrTimeUtc ? moment(f.arrTimeUtc).utc().toISOString() : null,

    // 轉回當地時區（顯示用）
    depLocalDisplay: f.depTimeUtc ? moment(f.depTimeUtc).tz(originZone).format("YYYY-MM-DD HH:mm") : null,
    arrLocalDisplay: f.arrTimeUtc ? moment(f.arrTimeUtc).tz(destZone).format("YYYY-MM-DD HH:mm") : null,
  }));

  res.json({ originZone, destZone, count: data.length, data });
});

/** 明細：/flight/:id?originZone=...&destZone=... */
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const originZone = String(req.query.originZone ?? "Asia/Taipei");
  const destZone   = String(req.query.destZone   ?? "Asia/Tokyo");

  const f = await prisma.flight.findUnique({ where: { flightId: id } });
  if (!f) return res.status(404).json({ error: "Flight not found" });

  res.json({
    ...f,
    depUtcISO: f.depTimeUtc ? moment(f.depTimeUtc).utc().toISOString() : null,
    arrUtcISO: f.arrTimeUtc ? moment(f.arrTimeUtc).utc().toISOString() : null,
    depLocalDisplay: f.depTimeUtc ? moment(f.depTimeUtc).tz(originZone).format("YYYY-MM-DD HH:mm") : null,
    arrLocalDisplay: f.arrTimeUtc ? moment(f.arrTimeUtc).tz(destZone).format("YYYY-MM-DD HH:mm") : null,
    zones: { originZone, destZone },
  });
});

export default router;
