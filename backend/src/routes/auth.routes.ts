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
// router.post("/register", async (req: Request, res: Response) => {
//    const { email, password, name } = req.body;

//   // fake data
//   // const email = 'test@gmail.com'
//   // const password = 'P@ssw0rd'
//   // const name='王小明'

//   try {
//     const existing = await prisma.member.findUnique({ where: { email } });
//     if (existing) {
//       return res.status(409).json({ message: "Email 已註冊" });
//     }

//     const hashed = await bcrypt.hash(password, 10);
//     const newUser = await prisma.member.create({
//       data: { email, password: hashed, firstName: name },
//     });

//     res.status(201).json({
//       message: "註冊成功",
//       user: { id: newUser.memberId, email },
//     });
//   } catch (err) {
//     console.error("❌ Register 錯誤內容:", err);
//     res.status(500).json({ message: "伺服器錯誤", error: err });
//   }
// });
router.post("/register", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return res.status(400).json({ message: "缺少必要欄位" });
  }

  try {
    const existing = await prisma.member.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: "此信箱已註冊" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await prisma.member.create({
      data: {
        firstName,
        lastName: lastName || "",
        email,
        password: hashed,
      },
    });

    res.status(201).json({
      message: "註冊成功",
      memberId: newUser.memberId.toString(),
    });
  } catch (err) {
    console.error("❌ Register error:", err);
    if (err.code === "P2002") {
      return res.status(409).json({ message: "此信箱已註冊" });
    }
    res.status(500).json({ message: "伺服器錯誤" });
  }
});


// ✅ 2️⃣ 登入
router.post("/login", async (req: Request, res: Response) => {
  console.log("🟢 收到登入請求", req.body);
  const { email, password } = req.body;

  try {
    const user = await prisma.member.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "帳號不存在" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "密碼錯誤" });
    }

    // 🟡 新增：更新最後登入時間
    await prisma.member.update({
      where: { memberId: user.memberId },
      data: { lastLogin: new Date() }
    });

    const token = jwt.sign(
      {
        memberId: Number(user.memberId),
        email: user.email,
      },
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
router.get("/verify", async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, message: "未提供 token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { memberId: number; email: string };

    // ✅ 新增：查資料庫回傳完整會員資料
    const member = await prisma.member.findUnique({
      where: { memberId: BigInt(decoded.memberId) },
      select: {
      memberId: true,
      email: true,
      firstName: true,
      lastName: true,
      gender: true,
      birthDate: true,
      phoneNumber: true,
      address: true,
      createdAt: true,   // 註冊日期
      lastLogin: true,   // 最後登入
      membershipLevel: true,
      mileage: true,
      avatarChoice: true,
      avatar: {
        select: {
          avatarId: true,
          imagePath: true,
          label: true,
        },
      },
    },
    });

    if (!member) {
      return res.status(404).json({ ok: false, message: "找不到會員" });
    }

    res.json({ ok: true, member });
  } catch (err) {
    console.error("❌ Verify 錯誤:", err);
    res.status(401).json({ ok: false, message: "token 無效或過期" });
  }
});

// =======================
// 取得頭像圖庫（後端 API）
// =======================
router.get("/avatars", async (req: Request, res: Response) => {
  try {
    const avatars = await prisma.avatarOption.findMany({
      where: { isActive: true },
      select: {
        avatarId: true,
        imagePath: true,
        label: true,
      },
    });

    res.json({ ok: true, avatars });
  } catch (err) {
    console.error("❌ Fetch avatars error:", err);
    res.status(500).json({ ok: false, message: "伺服器錯誤" });
  }
});

// ✅ 更新會員頭像
router.put("/update-avatar", async (req: Request, res: Response) => {
  const { memberId, avatarChoice } = req.body;
  if (!memberId || !avatarChoice)
    return res.status(400).json({ ok: false, message: "缺少必要參數" });

  try {
    await prisma.member.update({
      where: { memberId: BigInt(memberId) },
      data: { avatarChoice },
    });
    res.json({ ok: true, message: "頭像更新成功" });
  } catch (err) {
    console.error("❌ Update avatar error:", err);
    res.status(500).json({ ok: false, message: "伺服器錯誤" });
  }
});

// ✅ 更新會員個人資料
router.put("/update-profile", async (req: Request, res: Response) => {
  const { memberId, gender, birthDate, phoneNumber, address } = req.body;

  if (!memberId) return res.status(400).json({ ok: false, message: "缺少 memberId" });

  try {
    const updated = await prisma.member.update({
      where: { memberId: BigInt(memberId) },
      data: {
        gender: gender || null,
        birthDate: birthDate ? new Date(birthDate) : null,
        phoneNumber: phoneNumber || null,
        address: address || null,
      },
      select: {
        memberId: true,
        gender: true,
        birthDate: true,
        phoneNumber: true,
        address: true,
      },
    });

    res.json({ ok: true, message: "會員資料已更新", member: updated });
  } catch (err) {
    console.error("❌ Update profile error:", err);
    res.status(500).json({ ok: false, message: "伺服器錯誤" });
  }
});

// ✅ 變更密碼
router.put("/update-password", async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, message: "未提供 token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { memberId: number };
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ ok: false, message: "缺少欄位" });
    }

    const member = await prisma.member.findUnique({
      where: { memberId: BigInt(decoded.memberId) },
    });

    if (!member) return res.status(404).json({ ok: false, message: "找不到會員" });

    const match = await bcrypt.compare(oldPassword, member.password);
    if (!match) return res.status(401).json({ ok: false, message: "舊密碼錯誤" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.member.update({
      where: { memberId: BigInt(decoded.memberId) },
      data: { password: hashed },
    });

    res.json({ ok: true, message: "密碼更新成功" });
  } catch (err) {
    console.error("❌ Update password error:", err);
    res.status(500).json({ ok: false, message: "伺服器錯誤" });
  }
});

// ✅【新增】更新會員頭像 API
router.put("/update-avatar", async (req: Request, res: Response) => {
  try {
    const { memberId, avatarChoice } = req.body;

    if (!memberId || !avatarChoice) {
      return res
        .status(400)
        .json({ ok: false, message: "缺少必要參數（memberId 或 avatarChoice）" });
    }

    // ✅ 更新會員資料（avatarChoice）
    const updatedMember = await prisma.member.update({
      where: { memberId: BigInt(memberId) }, // ⚠️ Prisma BigInt 要轉換
      data: { avatarChoice: Number(avatarChoice) },
      include: {
        avatarOption: true, // 一併回傳關聯的頭像資料
      },
    });

    // ✅ 回傳更新後的會員資料
    return res.json({
      ok: true,
      message: "頭像更新成功",
      member: {
        memberId: updatedMember.memberId,
        avatarChoice: updatedMember.avatarChoice,
        avatar: updatedMember.avatarOption
          ? {
              imagePath: updatedMember.avatarOption.imagePath,
              label: updatedMember.avatarOption.label,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("❌ 更新頭像錯誤:", error);
    res.status(500).json({ ok: false, message: "伺服器內部錯誤" });
  }
});


// ✅ ⚠️ 最外層匯出，一定要在所有大括號都關完之後！
export default router;
