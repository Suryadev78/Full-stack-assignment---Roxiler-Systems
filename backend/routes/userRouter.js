import { Router } from "express";

const userRouter = Router();

userRouter.get("/getUser",(req,res)=>{
    res.send("Hello from userRouter");
})
export default userRouter;