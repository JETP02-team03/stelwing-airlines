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
    const userId = 2;

    if (!userId) return res.status(404).json({ message: "沒有提供User ID" }) //之後有 JWT 驗證時拉掉

    try {
      const plans = await prisma.plan.findMany({
        where: {
            userId: userId,
            isDeleted: 0,
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

  if (!userId) return res.status(404).json({ message: "沒有提供User ID" }) //之後有 JWT 驗證時拉掉

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

// | DELETE | /api/plans/:planId | 刪除旅程 |
router.delete('/:id', async (req: Request, res: Response) => {
  const userId = 2; //之後改為從 JWT 取 userID
  const planId = Number(req.params.id);
  
  // 驗證：(有沒有提供 userId)、有沒有提供 tripId、tripId 是不是數字
  if (!userId) return res.status(404).json({ message: "沒有提供User ID" }); //之後有 JWT 驗證時拉掉
  if (!planId || isNaN(planId)) {
    return res.status(400).json({ message: "沒有提供有效的旅程 ID" })
  };

  try {
    const plan = await prisma.plan.findUnique({ 
      where: { id: planId },
    });

    if (!plan) {
      return res.status(404).json({ message: "此筆旅程資料不存在" });
    };

    if (plan.userId !== BigInt(userId)) {
      return res.status(403).json({ message: "沒有權限刪除此資料" });
    }

    await prisma.plan.update({
      where: { id: planId },
      data: { isDeleted: 1 },
    });

    res.json({ message: "旅程刪除成功" });

  } catch (err) {
    res.status(500).json({ message: "系統錯誤，請再試一次" });
  };

  

});

export default router;