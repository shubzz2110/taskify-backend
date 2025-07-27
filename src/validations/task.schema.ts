import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  assignedTo: z.string().optional(),
  dueDate: z.string().optional(),
  difficulty: z.string(),
  priority: z.string(),
  attachments: z.object().array().optional(),
  createdBy: z.string(),
  section: z.string(),
  board: z.string(),
});