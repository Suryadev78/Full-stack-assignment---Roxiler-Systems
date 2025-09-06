import { Router } from "express";
import userRouter from "./userRouter.js";
import adminRouter from "./adminRouter.js";
import storeOwnerRouter from "./storeOwnerRouter.js";
const mainRouter = Router();

mainRouter.use("/user",userRouter);
mainRouter.use("/admin",adminRouter);
mainRouter.use("/store-owner",storeOwnerRouter);

export default mainRouter;