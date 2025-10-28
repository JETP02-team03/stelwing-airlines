import express from "express";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../utils/prisma-only.js"
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// #region 「每日行程」需要有的路由

// | GET | /api/plans/:planId/items | 讀取所有行程項目 |
// | POST | /api/plans/:planId/items | 新增行程項目 |
// | GET | /api/plans/:planId/items/:itemId | 讀取單一行程 |
// | PUT | /api/plans/:planId/items/:itemId | 更新單一行程 |
// | DELETE | /api/plans/:planId/items/:itemId | 刪除單一行程 |

// #endregion

export default router;