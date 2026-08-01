import {Router} from "express"
import { createProjectController, getProjectController, getProjectsController } from "../controllers/project.controller.js";

const router = Router();
// /api/projects

router.post("/", createProjectController)
router.get("/", getProjectsController)
router.get("/:id", getProjectController)

export default router;