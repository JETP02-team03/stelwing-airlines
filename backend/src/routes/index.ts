import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import plansRouter from "./plans/index.js";
import flightBookingRouter from "./flight-booking/index.js";
import flightSearchRouter from "./flight-search/index.js";

const router = Router();

// 統一掛在 /api 底下
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/plans", plansRouter);
router.use("/flight-booking", flightBookingRouter);
router.use("/flight-search", flightSearchRouter);

export default router;