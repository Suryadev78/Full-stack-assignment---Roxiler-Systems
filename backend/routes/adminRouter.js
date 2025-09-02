import { Router } from "express";

const adminRouter = Router();

adminRouter.get("/getAdmin",(req,res)=>{
    res.send("Hello from adminRouter");
})
export default adminRouter;