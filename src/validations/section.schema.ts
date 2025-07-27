import z from "zod";

export const createSectionSchema = z.object({
  title: z.string().min(5),
  position: z.number().min(0),
  board: z.string(),
  createdBy: z.string(),
});
