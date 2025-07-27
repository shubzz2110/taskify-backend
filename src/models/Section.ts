import mongoose, { Document, ObjectId } from "mongoose";

export interface ISection extends Document {
  title: string;
  position: number;
  board: ObjectId
  createdBy: ObjectId
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new mongoose.Schema<ISection>({
  title: { type: String, required: true },
  position: { type: Number, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Board" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
}, { timestamps: true });

const Section = mongoose.model("Section", SectionSchema);

export default Section;