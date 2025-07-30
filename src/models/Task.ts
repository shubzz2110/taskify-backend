import mongoose, { Document, ObjectId } from "mongoose";
import Counter from "./Counter";

export interface ITask extends Document {
  title: string;
  description?: string;
  assignedTo?: ObjectId;
  dueDate?: Date;
  difficulty: "low" | "medium" | "hard";
  priority: "low" | "medium" | "high";
  attachments?: string[];
  createdBy: ObjectId;
  section: ObjectId;
  board: ObjectId;
  position: number;
  taskId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dueDate: { type: String },
    difficulty: {
      type: String,
      enum: ["low", "medium", "hard"],
      required: true,
    },
    priority: { type: String, enum: ["low", "medium", "high"], required: true },
    attachments: { type: Array, default: [] },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    position: { type: Number, required: true },
    taskId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

TaskSchema.pre("save", async function (next) {
  const task = this as ITask;
  if (!task.isNew || task.taskId) {
    next(); // Skipping if it has ID already
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "task" },
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );

    const paddedId = String(counter.seq).padStart(6, "0");
    task.taskId = paddedId;

    next();
  } catch (error: any) {
    next(error);
  }
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
