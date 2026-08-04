import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getTaskController, updateTaskStatusController } from "../controllers/task.controller.js";

const router = Router()
// /api/tasks

router.get("/:id", asyncHandler(getTaskController))
router.patch("/:id/status", asyncHandler(updateTaskStatusController))

export default router;