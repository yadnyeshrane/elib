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
    res.json({ token: token });
};

export { createUser };
