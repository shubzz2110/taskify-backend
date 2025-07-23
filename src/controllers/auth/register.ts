import { Request, Response } from "express";
import User from "../../models/User";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, signedUpFrom, firebaseUserId, avatar } = req.body;
    const existingUser = await User.findOne({ email }).select(["email"]);

    if (existingUser)
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });

    await User.create({ name, email, signedUpFrom, firebaseUserId, avatar });
    return res.status(201).json({ success: true, message: "User registered successfully" })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export default registerUser;