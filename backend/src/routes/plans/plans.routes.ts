import express from "express";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../utils/prisma-only.js"
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { success } from "zod";
import { serializeBigInt } from "../../utils/serializeBigInt.js"

const router = express.Router();

// #region 「旅程資料」需要有的路由

// | GET | /api/plans | 讀取所有旅程 |
// | POST | /api/plans | 新增旅程 |
// | GET | /api/plans/:planId | 讀取單一旅程 |
// | PUT | /api/plans/:planId | 更新旅程 |
// | DELETE | /api/plans/:planId | 刪除旅程 |

// #endregion

// | GET | /api/plans | 讀取所有旅程 |
router.get("/", async (req: Request, res: Response) => {
    const userId = 1;

    if (!userId) return res.status(404).json({ message: "沒有提供User ID" })

    try {
      const plans = await prisma.plan.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            startDate: "desc",
        }
      })
      res.json(serializeBigInt(plans));
    } catch (err) {
      res.status(500).json({ error: (err as Error).message});
    }
})

// | POST | /api/plans | 新增旅程 |
router.post("/", async (req: Request, res: Response) => {
  const userId = 2; //之後改為從 JWT 取 userID

  if (!userId) return res.status(404).json({ message: "沒有提供User ID" })

  try {
    const {
      title,
      destination,
      startDate,
      startTimezone,
      endDate,
      endTimezone,
      note,
      coverImage,
    } = req.body;

    const newPlan = await prisma.plan.create({
      data: {
        userId,
        title,
        destination, //選填
        startDate,
        startTimezone,
        endDate,
        endTimezone,
        note,  //選填
        coverImage, //選填
      },
    });

    res.status(201).json({ 
      success: true,
      message: "旅程新增成功",
    })
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "旅程新增失敗，",
      error: (err as Error).message
    });
  }
})

export default router;