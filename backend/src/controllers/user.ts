import type { Request, Response } from "express";
import { User } from "../modules/user.js";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.body;
    if (!user) {
      return res.status(400).json({ message: "User data is required" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Error updating user" });
  }
};
