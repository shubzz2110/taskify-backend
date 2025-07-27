import { Request, Response } from "express";
import Board from "../../models/Board";
import mongoose from "mongoose";

const getBoardDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const board = await Board.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "sections",
          let: { boardId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$board", "$$boardId"] },
              },
            },
            { $sort: { position: 1 } },
            {
              $lookup: {
                from: "tasks",
                let: { sectionId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$section", "$$sectionId"] },
                    },
                  },
                  { $sort: { position: 1 } },
                  {
                    $lookup: {
                      from: "users",
                      localField: "assignedTo",
                      foreignField: "_id",
                      as: "assignedToUser",
                    },
                  },
                  {
                    $unwind: {
                      path: "$assignedToUser",
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                  {
                    $lookup: {
                      from: "users",
                      localField: "createdBy",
                      foreignField: "_id",
                      as: "createdByUser",
                    },
                  },
                  {
                    $unwind: {
                      path: "$createdByUser",
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                  {
                    $addFields: {
                      assignedTo: {
                        _id: "$assignedToUser._id",
                        name: "$assignedToUser.name",
                        email: "$assignedToUser.email",
                        avatar: "$assignedToUser.avatar",
                      },
                      createdBy: {
                        _id: "$assignedToUser._id",
                        name: "$assignedToUser.name",
                        email: "$assignedToUser.email",
                        avatar: "$assignedToUser.avatar",
                      },
                    },
                  },
                  {
                    $project: {
                      assignedToUser: 0,
                      createdByUser: 0,
                    },
                  },
                ],
                as: "tasks",
              },
            },
          ],
          as: "sections",
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
        $project: {
          title: 1,
          description: 1,
          emoji: 1,
          isFavourite: 1,
          createdAt: 1,
          updatedAt: 1,
          sections: 1,
          createdBy: {
            _id: "$createdBy._id",
            name: "$createdBy.name",
            email: "$createdBy.email",
            avatar: "$createdBy.avatar",
          },
        },
      },
    ]);

    if (!board[0]) return res.status(404).json({ message: "Board not found" });

    return res.status(200).json({ board: board[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load board", error });
  }
};

export default getBoardDetails;
