import { Request, Response } from "express";
import Board from "../../models/Board";
import Section, { ISection } from "../../models/Section";
import Task, { ITask } from "../../models/Task";

const createBoard = async (req: Request, res: Response) => {
  try {
    const { title, description, emoji, createdBy, sections } = req.body;
    const board = await Board.create({
      title,
      description,
      emoji,
      createdBy,
    });

    if (sections.length > 0) {
      const allTasks: any[] = [];
      const sectionDocs = await Section.insertMany(
        sections.map((section: any) => ({
          title: section.title,
          position: section.position,
          createdBy: section.createdBy,
          board: board._id,
        }))
      );
      sectionDocs.forEach((sectionDoc, index) => {
        const sectionTasks = sections[index].tasks || [];
        sectionTasks.forEach((task: any) => {
          allTasks.push({
            title: task.title,
            description: task.description,
            assignedTo: task.assignedTo,
            dueDate: task.dueDate,
            difficulty: task.difficulty,
            priority: task.priority,
            attachments: task.attachments || [],
            createdBy: task.createdBy,
            section: sectionDoc._id,
            board: board._id,
          });
        });
      });

      if (allTasks.length > 0) {
        await Task.insertMany(allTasks);
      }
    }
    return res.status(201).json({
      message: "Board, sections, and tasks created successfully",
      boardId: board._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default createBoard;