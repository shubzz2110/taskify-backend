import { Request, Response } from "express";
import Board from "../../models/Board";

const getAllBoards = async (req: Request, res: Response) => {
  try {
    const boards = await Board.aggregate([
      {
        $lookup: {
          from: "sections",
          localField: "_id",
          foreignField: "board",
          as: "sections",
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "board",
          as: "tasks",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: {
          path: "$createdBy",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          sectionCount: { $size: "$sections" },
          taskCount: { $size: "$tasks" },
          createdBy: {
            _id: "$createdBy._id",
            name: "$createdBy.name",
            email: "$createdBy.email",
            avatar: "$createdBy.avatar",
          },
        },
      },
      {
        $project: {
          sections: 0,
          tasks: 0,
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);
    return res.status(200).json({ boards });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default getAllBoards;
