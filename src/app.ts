import express, { type NextFunction, type Request, type Response } from 'express';
import type { HttpError } from 'http-errors';
import globalHandler from './middleware/GlobalHandler.ts';
import userRouter from './user/userRouter.ts';
import bookRouter from './book/bookRouter.ts';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res,next) => {
    res.json({message : 'Data get'})
});

app.use('/api/users',userRouter);
app.use('/api/books', bookRouter);

app.use(globalHandler);



export default app;