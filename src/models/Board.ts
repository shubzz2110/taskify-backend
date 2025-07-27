import mongoose, { Document, ObjectId } from "mongoose";

export interface IBoard extends Document {
  title: string;
  description?: string;
  emoji?: string;
  isFavourite: boolean;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BoardSchema = new mongoose.Schema<IBoard>({
  title: { type: String, required: true },
  description: { type: String },
  emoji: { type: String },
  isFavourite: { type: Boolean, default: false },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Board = mongoose.model("Board", BoardSchema)

export default Board;
