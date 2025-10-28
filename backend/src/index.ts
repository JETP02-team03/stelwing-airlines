// 匯⼊套件及類型定義 (類別、介⾯) 
import express from "express"; 
// *** verbatimModuleSyntax 為 true 時，標⽰匯⼊類型 
import type { Request, Response, NextFunction } from "express"; 
// 截⼊環境變數設定檔 
import "dotenv/config";
// 載入各種路由
import { requireAuth } from "./middleware/jwt.js";
import apiRouter from "./routes/index.js"
// 周邊工具安裝：zod 驗證、session 們
import { z } from "zod";
import session from "express-session";
import sessionFileStore from "session-file-store";
import cors from "cors";
import { log } from "console";

const FileStore = sessionFileStore(session);

// 建⽴伺服器主物件 
const app = express(); 
// 設定靜態內容資料夾 
app.use(express.static("public")); 
// 解析 JSON body 的中間件 
app.use(express.json()); 
// 解析 URL-encoded body 的中間件 
app.use(express.urlencoded({ extended: true })); 
// 允許所有來源訪問
app.use(cors());

// - - - 路由區 - - -

// 網站根目錄⾴⾯ 
app.get("/", (req: Request, res: Response) => { 
  res.send("歡迎來到 Express + TS !"); 
}); 

// 測試 Prisma 與 Create
app.use("/api", apiRouter);

const port = +(process.env.PORT || "3002"); 
app.listen(port, () => { 
  console.log(`Express + TS 啟動 http://localhost:${port}`); 
}); 