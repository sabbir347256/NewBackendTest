import type { NextFunction, Request, Response } from "express";
import type { HttpError } from "http-errors";
import app from "../app.ts";

const globalHandler = ((err:HttpError, req:Request,res:Response, next: NextFunction) => {
    const statuscode = err.statusCode || 500;

    return res.status(statuscode).json({
        message : err.message,
        // errorStack : err.stack
    })
});

export default globalHandler;
