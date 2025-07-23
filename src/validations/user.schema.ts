import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  signedUpFrom: z.string(),
  firebaseUserId: z.string(),
  avatar: z.string().optional(),
});