import { Request, Response } from "express";
import User from "../../models/User";

const getUsers = async (req: Request, res: Response) => {
  try {
    // const loggedInFirebaseId = req.user?.uid;
    const users = await User.find().select(['name', 'email', 'avatar']);
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error", error });
  }
}

export default getUsers;