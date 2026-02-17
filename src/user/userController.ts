import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel.ts";
import bcrypt from 'bcrypt';
import { config } from "../config/config.ts";
import jwt from "jsonwebtoken";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, 'All fields are required');
        return next(error);
    };

    const user = await userModel.findOne({ email });

    if (user) {
        const error = createHttpError(400, "User allready exists");
        return next(error);
    };


    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
        name,
        email,
        password: hashedPass
    });

    const token = jwt.sign({ sub: newUser._id }, config.jwsecret as string, {
        expiresIn: "7d"
    });


    res.status(201).json({ accessToken: token });




};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({message : 'ALL fields are required'});
    };

    const user =await userModel.findOne({email});

    if(!user){
        return next(createHttpError(404, 'User not found'));
    };

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return next(createHttpError(401, 'Username and password incorrect'));
    };

    const token = jwt.sign({ sub: user._id }, config.jwsecret as string, {
        expiresIn: "7d"
    });

    res.json({accessToken : token});




};

export { createUser, loginUser };