import express from 'express'
import isUserAuthenticated from '../middleware/authMiddleware';
import validate from '../middleware/validate';
import { createTaskSchema } from '../validations/task.schema';
import createTask from '../controllers/task/create';

const router = express.Router();

router.post('/create', [isUserAuthenticated, validate({ body: createTaskSchema })], createTask);

export default router;