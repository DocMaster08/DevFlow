import express from "express"
import healthRoutes from "./routes/health.routes.js"
import projectRoutes from "./routes/project.routes.js";

const app = express()

app.use(express.json());
app.use("/api/health", healthRoutes)
app.use("/api/projects", projectRoutes)

export default app;