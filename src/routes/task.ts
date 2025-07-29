import express from 'express'
import isUserAuthenticated from '../middleware/authMiddleware';
import validate from '../middleware/validate';
import { createTaskSchema } from '../validations/task.schema';
import createTask from '../controllers/task/create';
import updateTaskPosition from '../controllers/task/update-positions';

const router = express.Router();

router.post('/create', [isUserAuthenticated, validate({ body: createTaskSchema })], createTask);
router.put('/update-positions', [isUserAuthenticated], updateTaskPosition);

export default router;