import { Router } from "express";
import authRouter from "./authRouter.js";
import { submitRating } from "../controllers/submitRating.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { listStoresByFilter } from "../controllers/listStoresByFilter.js";
const userRouter = Router();
userRouter.use("/auth",authRouter);;
userRouter.post("/rate-store",authMiddleware,submitRating);
userRouter.get("/list-stores",authMiddleware,listStoresByFilter)
export default userRouter;