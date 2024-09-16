import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import producrRouter from './routes/productRoutes';

const app = express()
.use(express.json())
.use(cors());

app.use('/api', userRouter);
app.use('/api', producrRouter);

export default app;