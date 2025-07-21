// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    avatarUrl: String,
  },
  { timestamps: true }
);

// export default mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema);
module.exports = User;
