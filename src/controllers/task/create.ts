import { Request, Response } from "express";
import Task from "../../models/Task";

const createTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      assignedTo,
      dueDate,
      difficulty,
      priority,
      attachments,
      createdBy,
      section,
      board,
    } = req.body;

    const count = await Task.countDocuments({ section });

    const task = await Task.create({
      title,
      description,
      assignedTo,
      dueDate,
      difficulty,
      priority,
      attachments,
      createdBy,
      section,
      board,
      position: count,
    });
    return res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default createTask;
