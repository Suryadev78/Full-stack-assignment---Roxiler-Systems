import { Router } from "express";
import { login, logout, signup, updatePassword } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const authRouter = Router();

authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.put("/update-password",authMiddleware,updatePassword);
authRouter.post("/logout",logout)

export default authRouter;