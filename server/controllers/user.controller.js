import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getUserDataUri from "../utils/dataUri.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(500).json({
        success: false,
        message: "all fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User register successfully",
      newUser,
    });
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          bio: user.bio,
          gernder: user.gender,
          role: user.role,
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    let user = await User.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      message: "profile get successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  try {
    // Ye id aapka authenticated user ka hai
    const userId = req.id;

    // Request body se bio aur gender ko nikal rahe hain
    const { bio, gender } = req.body;

    // Request se profilePicture bhi nikal rahe hain
    const profilePicture = req.file;

    let cloudResponse;

    // Agar profile picture file milti hai toh usko Cloudinary pe upload karein
    if (profilePicture) {
      // Get the Data URI of the profile picture
      const fileUri = getUserDataUri(req.file);

      // Cloudinary pe upload kare aur response ko cloudResponse me store kare
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    // `userId` ko `findById` method me pass karein bina kisi extra object ke
    const user = await User.findById(userId).select("-password");

    // Agar user nahi milta toh error response de
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the user's profile details
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;

    // User ko save karne ke baad success response bheje
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
