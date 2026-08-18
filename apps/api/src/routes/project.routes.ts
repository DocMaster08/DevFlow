import { Router } from "express"
import { createProjectController, deleteProjectController, getProjectController, getProjectsController, updateProjectController } from "../controllers/project.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createTaskController, getTasksController } from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
// /api/projects

// task related
router.post("/:projectId/tasks",authMiddleware, asyncHandler(createTaskController))
router.get("/:projectId/tasks",authMiddleware, asyncHandler(getTasksController))

// project related
router.post("/", authMiddleware, asyncHandler(createProjectController))
router.get("/", authMiddleware, asyncHandler(getProjectsController))
router.get("/:projectId", authMiddleware, asyncHandler(getProjectController))
router.patch("/:projectId", authMiddleware, asyncHandler(updateProjectController))
router.delete("/:projectId", authMiddleware, asyncHandler(deleteProjectController))



export default router;