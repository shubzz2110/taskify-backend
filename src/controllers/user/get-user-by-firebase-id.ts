import { Request, Response } from "express";
import User from "../../models/User";

const getUser = async (req: Request, res: Response) => {
  try {
    const firebaseUserId = req.user?.uid;
    const user = await User.findOne({ firebaseUserId });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export default getUser;