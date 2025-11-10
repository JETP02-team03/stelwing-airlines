// // //這個檔案是寫登入 / 註冊 / 驗證
// // import express from "express";
// // import type { Request, Response, NextFunction } from "express";
// // import { prisma } from "../utils/prisma-only.js"
// // import { authMiddleware } from "../middleware/authMiddleware.js";
// // import { success, z } from "zod";
// // import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";
// // import { log } from "console";

// // const router = express.Router();

// // // #region 「驗證」需要有的路由

// // // 只驗 JWT token 是否有效、不撈取資料庫任何資料的 /verify
// // // 會員註冊的 /register
// // // 會員登入的 /login

// // // 如果有搭配 zod 驗證，zod 格式也要加在這裡
// // // #endregion

// // export default router;

// import express, { type Request, type Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { prisma } from "../utils/prisma-only.js";

// const router = express.Router();

// // JWT 秘密鑰（在 .env 設定 JWT_SECRET）
// const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// // ✅ 1️⃣ 註冊
// router.post("/register", async (req: Request, res: Response) => {
//   const { email, password, name } = req.body;

//   try {
//     // 檢查帳號是否存在
//     const existing = await prisma.member.findUnique({ where: { email } });
//     if (existing) return res.status(409).json({ message: "Email 已註冊" });

//     // 密碼加密
//     const hashed = await bcrypt.hash(password, 10);
//     const newUser = await prisma.member.create({
//       data: { email, password: hashed, name },
//     });

//     res.status(201).json({ message: "註冊成功", user: { id: newUser.memberId, email } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "伺服器錯誤" });
//   }
// });

// // ✅ 2️⃣ 登入
// router.post("/login", async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     const user = await prisma.member.findUnique({ where: { email } });
//     if (!user) return res.status(401).json({ message: "帳號不存在" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ message: "密碼錯誤" });

//     // 產生 JWT token
//     const token = jwt.sign(
//       { memberId: user.memberId, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "3h" }
//     );

//     res.json({ message: "登入成功", token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "伺服器錯誤" });
//   }
// });

// // ✅ 3️⃣ 驗證 token
// router.get("/verify", (req: Request, res: Response) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith("Bearer ")) {
//     return res.status(401).json({ ok: false, message: "未提供 token" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     res.json({ ok: true, user: decoded });
//   } catch {
//     res.status(401).json({ ok: false, message: "token 無效或過期" });
//   }
// });
import express, { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma-only.js";

const router = express.Router();

// JWT 秘密鑰（在 .env 設定 JWT_SECRET）
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// ✅ 1️⃣ 註冊
router.post("/register", async (req: Request, res: Response) => {
   const { email, password, name } = req.body;

  // fake data
  // const email = 'test@gmail.com'
  // const password = 'P@ssw0rd'
  // const name='王小明'

  try {
    const existing = await prisma.member.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email 已註冊" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await prisma.Member.create({
      data: { email, password: hashed, firstName: name },
    });

    res.status(201).json({
      message: "註冊成功",
      user: { id: newUser.memberId, email },
    });
  } catch (err) {
    console.error("❌ Register 錯誤內容:", err);
    res.status(500).json({ message: "伺服器錯誤", error: err });
  }
});

// ✅ 2️⃣ 登入
router.post("/login", async (req: Request, res: Response) => {
  console.log("🟢 收到登入請求", req.body);
  const { email, password } = req.body;

  try {
    const user = await prisma.Member.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "帳號不存在" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "密碼錯誤" });
    }

    const token = jwt.sign(
      { memberId: user.memberId, email: user.email },
      JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({ message: "登入成功", token });
  } catch (err) {
    console.error("❌ Login 錯誤內容:", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// ✅ 3️⃣ 驗證 token
router.get("/verify", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, message: "未提供 token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ ok: true, user: decoded });
  } catch {
    res.status(401).json({ ok: false, message: "token 無效或過期" });
  }
});

// ✅ ⚠️ 最外層匯出，一定要在所有大括號都關完之後！
export default router;
