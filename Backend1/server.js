import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";   // 👈 FIXED
import tasksRoutes from "./routes/tasksRoutes.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);  // 👈 Now defined

app.use("/api/tasks", tasksRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
