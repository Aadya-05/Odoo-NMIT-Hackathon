import express from "express";
import { getProjects, getProject, createProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);        // Retrieve all projects
router.get("/:id", getProject);      // Retrieve single project by ID
router.post("/", createProject);     // Create a new project

export default router;
