
import { Router, type Request, type Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

const QuerySchema = z.object({
  query: z.string().trim().min(1, "query is required"),
});

/**
 * GET /api/flight-search/airports?query=TPE
 * 支援以 IATA(airportCode)、機場名(airportName)、城市名(cityName) 模糊搜尋
 * 版本相容：不使用 StringFilter.mode、不依賴 Airport <-> City 關聯名稱
 */
router.get("/", async (req: Request, res: Response) => {
  const parsed = QuerySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const q = parsed.data.query;

  // 1) 先找符合的城市（用 cityName contains）
  const matchedCities = await prisma.city.findMany({
    where: { cityName: { contains: q } }, // 不用 mode，避免型別不相容
    select: {
      cityId: true,
      cityName: true,
      country: { select: { countryCode: true } }, // 若沒設關聯可拿掉
    },
    take: 50,
  });
  const cityIdSet = new Set(matchedCities.map((c) => c.cityId));
  const cityInfoMap = new Map(
    matchedCities.map((c) => [
      c.cityId,
      { cityName: c.cityName, countryCode: c.country?.countryCode ?? "" },
    ])
  );

  // 2) 查機場（IATA / 名稱 / 在上述城市內）
  const airports = await prisma.airport.findMany({
    where: {
      OR: [
        { airportCode: { contains: q } }, // 不用 mode
        { airportName: { contains: q } }, // 不用 mode
        ...(cityIdSet.size > 0 ? [{ cityId: { in: Array.from(cityIdSet) } }] : []),
      ],
    },
    select: {
      // 這裡只選出必要欄位，與你的 seed 欄位一致
      airportId: true, // 如果你的 PK 不是 airportId，改成實際欄位
      airportCode: true,
      airportName: true,
      cityId: true,
    },
    orderBy: [{ airportCode: "asc" }],
    take: 20,
  });

  // 3) 若有些機場的 city 尚未在 matchedCities 中，補查一次（避免沒有關聯 include）
  const missingCityIds = Array.from(
    new Set(
      airports
        .map((a) => a.cityId)
        .filter((id) => id != null && !cityInfoMap.has(id as any))
    )
  ) as number[] | bigint[];
  if (missingCityIds.length > 0) {
    const extraCities = await prisma.city.findMany({
      where: { cityId: { in: missingCityIds as any } },
      select: {
        cityId: true,
        cityName: true,
        country: { select: { countryCode: true } },
      },
    });
    for (const c of extraCities) {
      cityInfoMap.set(c.cityId, {
        cityName: c.cityName,
        countryCode: c.country?.countryCode ?? "",
      });
    }
  }

  // 4) 組成前端需要的 DTO
  const dto = airports.map((a) => {
    const cityInfo = cityInfoMap.get(a.cityId as any);
    return {
      id: a.airportId ?? a.airportCode, // 兼容不同 PK 命名
      iata: a.airportCode,
      name: a.airportName,
      city: cityInfo?.cityName ?? "",
      countryCode: cityInfo?.countryCode ?? "",
    };
  });

  res.json(dto);
});

export default router;
