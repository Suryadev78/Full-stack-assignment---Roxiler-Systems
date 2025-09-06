import { Router } from "express";
import authRouter from "./authRouter.js";
const userRouter = Router();
userRouter.use("/auth",authRouter);;
export default userRouter;