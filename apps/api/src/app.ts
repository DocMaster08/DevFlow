import express from "express"
import healthRoutes from "./routes/health.routes.js"
import projectRoutes from "./routes/project.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express()

app.use(express.json());
app.use("/api/health", healthRoutes)
app.use("/api/projects", projectRoutes)


app.use(errorMiddleware)

export default app;