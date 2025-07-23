import express from 'express'
import isUserAuthenticated from '../middleware/authMiddleware';
import getUser from '../controllers/user/get-user-by-firebase-id';

const router = express.Router();

router.get('/get-user', isUserAuthenticated, getUser);

export default router;