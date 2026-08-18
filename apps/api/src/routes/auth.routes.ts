import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getCurrentUserController, loginUserController, registerUserController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = Router()

router.post("/register", asyncHandler(registerUserController))
router.post("/login", asyncHandler(loginUserController))
router.get("/me", authMiddleware, asyncHandler(getCurrentUserController))

export default router;