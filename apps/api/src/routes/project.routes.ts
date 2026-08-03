import {Router} from "express"
import { createProjectController, getProjectController, getProjectsController } from "../controllers/project.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createTaskController } from "../controllers/task.controller.js";

const router = Router();
// /api/projects

// task related
router.post("/:projectId/tasks", asyncHandler(createTaskController))

// project related
router.post("/", asyncHandler(createProjectController) )
router.get("/", asyncHandler(getProjectsController))
router.get("/:projectId", asyncHandler(getProjectController))



export default router;