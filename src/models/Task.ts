import mongoose, { Document, ObjectId } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  assignedTo?: ObjectId;
  dueDate?: Date;
  difficulty: "low" | "medium" | "hard";
  priority: "low" | "medium" | "high";
  attachments?: string[]
  isCompleted: boolean;
  completedBy?: string;
  createdBy: ObjectId;
  section: ObjectId;
  board: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dueDate: { type: String },
  difficulty: { type: String, enum: ['low', 'medium', 'hard'], required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  attachments: { type: Array, default: [] },
  isCompleted: { type: Boolean, default: false },
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true }
}, { timestamps: true })

const Task = mongoose.model("Task", TaskSchema);

export default Task;