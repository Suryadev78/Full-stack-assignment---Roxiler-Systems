import { Router } from "express";
import { login, signup, updatePassword } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const authRouter = Router();

authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.put("/update-password",authMiddleware,updatePassword);

export default authRouter;