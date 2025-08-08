import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = user;
    req.userId = user._id; // ✅ FIX: Add this line

    next();

  } catch (error) {
    console.error("authUser error:", error.message);
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

export default authUser;
