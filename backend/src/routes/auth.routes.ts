import express from "express";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma-only.js"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { success, z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { log } from "console";

const router = express.Router();

// #region 「驗證」需要有的路由

// 只驗 JWT token 是否有效、不撈取資料庫任何資料的 /verify
// 會員註冊的 /register
// 會員登入的 /login

// 如果有搭配 zod 驗證，zod 格式也要加在這裡
// #endregion

export default router;