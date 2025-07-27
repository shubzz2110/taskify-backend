import express from 'express'
import isUserAuthenticated from '../middleware/authMiddleware';
import getUser from '../controllers/user/get-user-by-firebase-id';
import getUsers from '../controllers/user/get-users';

const router = express.Router();

router.get('/get-user', isUserAuthenticated, getUser);
router.get('/get-users', isUserAuthenticated, getUsers);

export default router;