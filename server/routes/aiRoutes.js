import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import { enchanceJobDesc, enchanceProfessinalSummary, uploadResume } from '../controllers/AIController.js';

const aiRouter = express.Router();

aiRouter.post('/enchance-pro-sum', protect , enchanceProfessinalSummary)
aiRouter.post('/enchance-job-desc', protect , enchanceJobDesc)
aiRouter.post('/upload-resume', protect , uploadResume)

export default aiRouter;