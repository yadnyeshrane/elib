import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModule from "./userModule";
import bcrypt from "bcrypt";
import { User } from "./userTypes";
import { sign } from "jsonwebtoken";
import { config } from "../config/conifg";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    //validation
    const { name, email, pwd } = req.body;
    //express validator
    if (!name || !email || !pwd) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }
    //process
    const user = await userModule.findOne({ email: email });
    if (user) {
        const error = createHttpError(400, "user already exist");
        return next(error);
    }
    //password has

    const hashpassword = await bcrypt.hash(pwd, 10);
    let newUser: User;
    try {
        newUser = await userModule.create({ name, email, pwd: hashpassword });
    } catch (error) {
        return next(createHttpError(500, "Error while creating user."));
    }
    //Token generation

    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
        expiresIn: "7d",
    });

    //response
    res.status(201).json({ token: token });
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, pwd } = req.body;
    try {
        if (!email || !pwd) {
            const error = createHttpError(400, "All fields required");
            return next(error);
        }
        const user = await userModule.findOne({ email: email });
        if (!user) {
            const error = createHttpError(404, "User does not exist");
            return next(error);
        }
        const isMatch = await bcrypt.compare(pwd, user.pwd);
        if (!isMatch) {
            const error = createHttpError(
                400,
                "Username or password is incorrect"
            );
            return next(error);
        }
        const token = sign({ sub: user._id }, config.jwtSecret as string, {
            expiresIn: "7d",
        });
        res.json({ accesstoken: token });
    } catch (error) {
        console.log("Error", error);
    }
};

export { createUser, loginUser };
