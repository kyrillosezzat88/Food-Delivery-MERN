import type { Request, Response } from "express";
import { User } from "../modules/user.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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
    const token = JWT.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
    );
    const userData = { ...user.toObject(), password: undefined };
    res
      .status(200)
      .json({ message: "Login successful", user: userData, token });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const RegisterController = async (req: Request, res: Response) => {
  const { name, email, password, address, phoneNumber } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
