import express from "express";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../utils/prisma-only.js"
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// #region 「旅程資料」需要有的路由

// | GET | /api/plans | 讀取所有旅程 |
// | POST | /api/plans | 新增旅程 |
// | GET | /api/plans/:planId | 讀取單一旅程 |
// | PUT | /api/plans/:planId | 更新旅程 |
// | DELETE | /api/plans/:planId | 刪除旅程 |

// #endregion

export default router;