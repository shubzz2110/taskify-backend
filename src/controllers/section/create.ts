import { Request, Response } from "express";
import Section from "../../models/Section";

const createSection = async (req: Request, res: Response) => {
  try {
    const { title, board, createdBy, position } = req.body;

    const section = await Section.create({
      title,
      createdBy,
      board,
      position,
    });
    return res.status(200).json({ section });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default createSection;
