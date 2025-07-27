import express from "express";
import isUserAuthenticated from "../middleware/authMiddleware";
import validate from "../middleware/validate";
import { createBoardSchema, getBoardSchema } from "../validations/board.schema";
import createBoard from "../controllers/board/create";
import getAllBoards from "../controllers/board/get";
import getBoardDetails from "../controllers/board/get-board";

const router = express.Router();

router.post(
  "/create",
  [isUserAuthenticated, validate({ body: createBoardSchema })],
  createBoard
);
router.get("/get", [isUserAuthenticated], getAllBoards);
router.get(
  "/get-board/:id",
  [isUserAuthenticated, validate({ params: getBoardSchema })],
  getBoardDetails
);

export default router;
