import type { Request, Response } from "express";
import { User } from "../modules/user.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";

export const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your account before signing in." });
    }

    const token = JWT.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
    );
    const userData = { ...user.toObject(), password: undefined };
    res.status(200).json({
      message: "Login successful",
      status: 200,
      user: userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const RegisterController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    // 1. Validate passwords match FIRST (before any DB/hashing work)
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password do not match" });
    }

    // 2. Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = generateToken();
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    // 4. Send email BEFORE saving user — if this fails, nothing is saved
    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `
        <p>Hi ${firstName},</p>
        <p>Thank you for registering. Please click the link below to verify your email address:</p>
        <a href="${verificationLink}" style="display:inline-block; padding:10px 20px; color:#fff; background-color:#007bff; text-decoration:none; border-radius:5px;">
          Verify Email
        </a>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br/>Food Delivery Team</p>
      `,
    });

    // 5. Only save user after email succeeds
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken: token,
      verificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60), // ✅ proper Date object
    });

    return res.status(201).json({
      message:
        "Registration successful. Please check your email to verify your account.",
      status: 201,
    });
  } catch (error) {
    console.error("RegisterController error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const VerifyEmailController = async (req: Request, res: Response) => {
  const { token } = req.query;

  // Ensure token is a string
  if (!token || typeof token !== "string") {
    return res
      .status(400)
      .json({ message: "Invalid or missing verification token." });
  }

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token." });
    }
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;

    await user.save();
    return res
      .status(200)
      .json({ message: "Email verified successfully.", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// google auth controller
export const googleCallback = async (req: Request, res: Response) => {
  const user = req.user as any;
  const token = JWT.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );
  const clientUrl = process.env.CLIENT_URL;
  if (!clientUrl) {
    return res.status(500).json({ message: "Missing CLIENT_URL in env" });
  }
  return res.redirect(`${clientUrl}/auth/callback?token=${token}`);
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
};
