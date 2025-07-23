const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} = require("../utils/cloudinaryUtils");
const { sendVerificationEmail } = require("../utils/verificationEmail");

// Replace with your own secret key in .env file in production
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user);
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Create JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    console.log("logged");
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Optionally generate token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    await sendVerificationEmail(newUser, token);
    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.profile = async (req, res) => {
  console.log(req.body, req.file);
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateFields = {};

    if (req.body.email) {
      updateFields.email = req.body.email;
    }
    if (req.body.name) {
      updateFields.name = req.body.name;
    }
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updateFields.password = hashedPassword;
    }

    if (req.file && user.avatarUrl) {
      const deleteResult = await deleteImageFromCloudinary(user.avatarUrl);
      if (!deleteResult.success) {
        return res.status(500).json({ message: deleteResult.message });
      }
      updateFields.avatarUrl = "";
    }

    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file.buffer);
      if (!uploadResult.success) {
        return res.status(400).json({ message: uploadResult.message });
      }
      updateFields.avatarUrl = uploadResult.secure_url; // Update the avatar URL
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });
    console.log(updatedUser);
    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.verifyPassword = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await bcrypt.compare(password, user.password);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    console.log("logged out");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
