import express from "express"
import cors from "cors"
import healthRoutes from "./routes/health.routes.js"
import projectRoutes from "./routes/project.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import taskRoutes from "./routes/task.routes.js";

const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json());
app.use("/api/health", healthRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)


app.use(errorMiddleware)

export default app;