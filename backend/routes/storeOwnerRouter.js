import { Router } from "express";
import { storeOwnerStores } from "../controllers/storeOwnerStores.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const storeOwnerRouter = Router();

storeOwnerRouter.get("/dashboard", authMiddleware, storeOwnerStores);

export default storeOwnerRouter;