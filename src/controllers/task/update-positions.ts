import { Request, Response } from "express";
import Task from "../../models/Task";

const updateTaskPosition = async (req: Request, res: Response) => {
  const { tasks } = req.body;

  try {
    const bulkOps = tasks.map(
      (task: { taskId: string; position: number; sectionId: string }) => ({
        updateOne: {
          filter: { _id: task.taskId },
          update: {
            $set: {
              position: task.position,
              section: task.sectionId,
            },
          },
        },
      })
    );

    await Task.bulkWrite(bulkOps);

    res.status(200).json({ message: "Positions updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update positions" });
  }
};

export default updateTaskPosition;