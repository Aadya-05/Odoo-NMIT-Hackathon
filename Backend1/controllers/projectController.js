import pool from "../db.js";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, description, created_by, created_at, status
       FROM projects
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single project by ID
export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT id, name, description, created_by, created_at, status
       FROM projects
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, created_by, status } = req.body;

    if (!name || !created_by) {
      return res.status(400).json({ message: "Name and created_by are required" });
    }

    const result = await pool.query(
      `INSERT INTO projects (name, description, created_by, status)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description || "", created_by, status || "Planning"]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ message: "Server error" });
  }
};
