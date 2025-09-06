import { Router } from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { createUserOrAdmin } from "../controllers/adminCreateUser_Admin.js";
import { createStore } from "../controllers/storeCreation.js";
import { adminDashboard } from "../controllers/adminDashboard.js";
import { listStoresByFilter } from "../controllers/listStoresByFilter.js";
import { listUsersByFilter } from "../controllers/listUsersByFilter.js";
import { submitRating } from "../controllers/submitRating.js";

const adminRouter = Router();

adminRouter.post("/create-store",authMiddleware,isAdmin,createStore);
adminRouter.post("/create-user",authMiddleware,isAdmin,createUserOrAdmin);
adminRouter.get("/dashboard",authMiddleware,isAdmin,adminDashboard)
adminRouter.get("/list-users",authMiddleware,isAdmin,listUsersByFilter);
adminRouter.get("/list-stores",authMiddleware,isAdmin,listStoresByFilter)
adminRouter.post("/rate-store",authMiddleware,isAdmin,submitRating);
export default adminRouter;