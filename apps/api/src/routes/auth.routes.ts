import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { registerUserController } from "../controllers/auth.controller.js";


const router = Router()

router.post("/register", asyncHandler(registerUserController))

export default router;