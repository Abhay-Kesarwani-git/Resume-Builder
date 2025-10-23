import expresss from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = expresss();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
connectDB();

app.use(expresss.json());



// Sample route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});