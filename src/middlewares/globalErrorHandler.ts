import { HttpError } from "http-errors";

import { NextFunction, Request } from "express";
import { config } from "../config/conifg";
const globalErrorhandler = (
    err: HttpError,
    req: Request,
    res: any,
    next: NextFunction
) => {
    const statuscode = err.statusCode || 500;
    return res.status(statuscode).json({
        message: err.message,
        errorStack: config.env === "development" ? err.stack : "",
    });
};

export default globalErrorhandler;
