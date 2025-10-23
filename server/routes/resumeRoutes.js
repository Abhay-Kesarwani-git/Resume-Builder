import express from "express"
import protect from "../middlewares/authMiddleware.js";
import { createResume, deleteResume, getResumeByPublicId, getResumeByUserId, updateResume } from "../controllers/resumeController.js";

const resumeRouter = express.Router();


resumeRouter.post('/create', protect, createResume);
resumeRouter.put('/update', protect, updateResume);
resumeRouter.delete('/delete/:id', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeByUserId);
resumeRouter.get('/public/:resumeId', getResumeByPublicId);

export default resumeRouter;