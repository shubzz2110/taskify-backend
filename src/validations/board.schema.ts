import z from "zod";

export const createBoardSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  emoji: z.string().optional(),
  createdBy: z.string(),
  sections: z
    .object({
      title: z.string(),
      position: z.number(),
      createdAt: z.string(),
      tasks: z
        .object({
          title: z.string(),
          description: z.string(),
          assignedTo: z.string(),
          dueDate: z.date(),
          difficulty: z.string(),
          priority: z.string(),
          attachments: z.object().array(),
          createdBy: z.string(),
        })
        .array()
        .optional(),
    })
    .array()
    .optional(),
});

export const getBoardSchema = z.object({
  id: z.string(),
});
