import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getTaskController } from "../controllers/task.controller.js";

const router = Router()
// /api/tasks

router.get("/:id", asyncHandler(getTaskController))

export default router;