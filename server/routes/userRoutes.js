import express from 'express';
import { getUserData, getUserResume, loginUser, registerUser } from '../controllers/UserController.js';
import protect from '../middlewares/authMiddleware.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data',protect, getUserData);
userRouter.get('/resumes', protect, getUserResume);

export default userRouter; 