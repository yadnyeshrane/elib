import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    //validation
    const { name, email, pwd } = req.body;
    //express validator
    if (!name || !email || !pwd) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }
    //process

    //response
    res.json({ message: "user created usss" });
};

export { createUser };
