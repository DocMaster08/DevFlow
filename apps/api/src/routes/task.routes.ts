import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createTaskCommentController, deleteTaskController, getTaskActivitiesController, getTaskCommentsController, getTaskController, updateTaskController } from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router()
// /api/tasks

router.get("/:id", authMiddleware, asyncHandler(getTaskController))
router.patch("/:id", authMiddleware, asyncHandler(updateTaskController))
router.delete("/:id", authMiddleware, asyncHandler(deleteTaskController))

router.get("/:taskId/activities", authMiddleware, asyncHandler(getTaskActivitiesController))

router.post("/:taskId/comments", authMiddleware, asyncHandler(createTaskCommentController))
router.get("/:taskId/comments", authMiddleware, asyncHandler(getTaskCommentsController))

export default router;