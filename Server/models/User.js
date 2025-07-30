import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Make catItems optional with default value
    catItems: { type: Object, default: {} },
  },
  { minimize: false }
);

// Prevent model overwrite during hot reload in dev
const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
