import express from "express";
import validate from "../middleware/validate";
import { registerUserSchema } from "../validations/user.schema";
import registerUser from "../controllers/auth/register";

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUser)

export default router;