import {Router} from "express"
import { createProjectController, getProjectController, getProjectsController } from "../controllers/project.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createTaskController, getTasksController } from "../controllers/task.controller.js";
import { getTasks } from "../services/task.service.js";

const router = Router();
// /api/projects

// task related
router.post("/:projectId/tasks", asyncHandler(createTaskController))
router.get("/:projectId/tasks", asyncHandler(getTasksController))

// project related
router.post("/", asyncHandler(createProjectController) )
router.get("/", asyncHandler(getProjectsController))
router.get("/:projectId", asyncHandler(getProjectController))



export default router;