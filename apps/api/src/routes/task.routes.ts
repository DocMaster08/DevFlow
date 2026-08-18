import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createTaskCommentController, getTaskActivitiesController, getTaskCommentsController, getTaskController, updateTaskController } from "../controllers/task.controller.js";

const router = Router()
// /api/tasks

router.get("/:id", asyncHandler(getTaskController))
router.patch("/:id", asyncHandler(updateTaskController))

router.get("/:taskId/activities", asyncHandler(getTaskActivitiesController))

router.post("/:taskId/comments", asyncHandler(createTaskCommentController))
router.get("/:taskId/comments", asyncHandler(getTaskCommentsController))

export default router;