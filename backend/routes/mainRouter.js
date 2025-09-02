import { Router } from "express";
import userRouter from "./userRouter.js";
import adminRouter from "./adminRouter.js";


const mainRouter = Router();


mainRouter.use("/user",userRouter);
mainRouter.use("/admin",adminRouter);


export default mainRouter;