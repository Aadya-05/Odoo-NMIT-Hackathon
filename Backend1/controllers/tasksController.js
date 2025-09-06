import pool from "../db.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.id, t.name, t.description, t.status, t.priority, t.progress,
              t.due_date, t.created_by, t.created_at, t.updated_at,
              u.name AS creator_name
       FROM tasks t
       LEFT JOIN users u ON t.created_by = u.id
       ORDER BY t.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single task by ID
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT t.id, t.name, t.description, t.status, t.priority, t.progress,
              t.due_date, t.created_by, t.created_at, t.updated_at,
              u.name AS creator_name
       FROM tasks t
       LEFT JOIN users u ON t.created_by = u.id
       WHERE t.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { name, description, status, priority, progress, due_date, created_by } = req.body;

    if (!name || !created_by) {
      return res.status(400).json({ message: "Task name and created_by are required" });
    }

    const result = await pool.query(
      `INSERT INTO tasks (name, description, status, priority, progress, due_date, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, description || "", status || "Planning", priority || "Medium", progress || 0, due_date || null, created_by]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, priority, progress, due_date } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           status = COALESCE($3, status),
           priority = COALESCE($4, priority),
           progress = COALESCE($5, progress),
           due_date = COALESCE($6, due_date),
           updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [name, description, status, priority, progress, due_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM tasks WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
};
