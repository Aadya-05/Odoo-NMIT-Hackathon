import jwt from "jsonwebtoken";
import pool from "../db.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userRes = await pool.query(
        "SELECT id, name, email FROM users WHERE id=$1",
        [decoded.id]
      );

      if (userRes.rows.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = userRes.rows[0]; // attach user to request
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;
