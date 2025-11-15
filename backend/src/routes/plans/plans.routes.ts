import express from "express";
import type { Request, Response, NextFunction } from "express";
import type { ApiResponse, ApiErrorResponse } from "../../interfaces/api.js"
// import type { Trip } from "./types.js";
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
        orderBy: [
          { startDate: 'desc' },  // 先依開始日期降冪
          { endDate: 'desc' }     // 開始日期相同時再依結束日期降冪
        ]
      })

      const response: ApiResponse = {
        success: true,
        message: "旅程查詢成功",
        data: serializeBigInt(plans)
      }
      res.status(200).json(response);
    } catch (err) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: (err as Error).message,
        message: "旅程查詢失敗，請稍後再試",
      }

      res.status(500).json(errorResponse);
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

    const response: ApiResponse = {
      success: true,
      message: "旅程新增成功",
      data: newPlan
    }

    res.status(201).json(response)
  } catch (err) {
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: (err as Error).message,
      message: "旅程新增失敗，請稍後再試",
    }

    res.status(500).json(errorResponse);
  }
})

// | DELETE | /api/plans/:planId | 刪除旅程 |
router.delete('/:id', async (req: Request, res: Response) => {
  const userId = 2; //之後改為從 JWT 取 userID
  const planId = Number(req.params.id);
  
  // 驗證：(有沒有提供 userId)、有沒有提供 tripId、tripId 是不是數字
  if (!userId) throw new Error('沒有提供 User ID'); //之後有 JWT 驗證時拉掉
  if (!planId || isNaN(planId)) throw new Error('沒有提供有效的旅程 ID');

  try {
    const plan = await prisma.plan.findUnique({ 
      where: { id: planId },
    });

    if (!plan) throw new Error('此筆旅程資料不存在');

    if (plan.userId !== BigInt(userId)) throw new Error('沒有權限刪除此資料');

    await prisma.plan.update({
      where: { id: planId },
      data: { isDeleted: 1 },
    });

    const response: ApiResponse<null> = {
      success: true,
      message: '旅程刪除成功',
    };
    res.json(response);

  } catch (err: any) {
    const errorResponse: ApiErrorResponse = {
      success: false,
      message: err.message || '系統錯誤，請再試一次',
      error: err.message || 'Unknown error',
    };
    res.status(500).json(errorResponse);
  };

  

});

export default router;