import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getTaskActivitiesController, getTaskController, updateTaskController } from "../controllers/task.controller.js";

const router = Router()
// /api/tasks

router.get("/:id", asyncHandler(getTaskController))
router.patch("/:id", asyncHandler(updateTaskController))
router.get("/:taskId/activities", asyncHandler(getTaskActivitiesController))

export default router;