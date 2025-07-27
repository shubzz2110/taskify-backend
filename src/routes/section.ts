import express from "express";
import isUserAuthenticated from "../middleware/authMiddleware";
import { createSectionSchema } from "../validations/section.schema";
import createSection from "../controllers/section/create";
import validate from "../middleware/validate";

const router = express.Router();

router.post(
  "/create",
  [isUserAuthenticated, validate({ body: createSectionSchema })],
  createSection
);

export default router;
