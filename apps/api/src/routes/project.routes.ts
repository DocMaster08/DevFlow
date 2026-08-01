import {Router} from "express"
import { createProjectController, getProjectController, getProjectsController } from "../controllers/project.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
// /api/projects

router.post("/", asyncHandler(createProjectController) )
router.get("/", asyncHandler(getProjectsController))
router.get("/:id", asyncHandler(getProjectController))

export default router;