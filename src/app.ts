import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/conifg";
import globalErrorhandler from "./middlewares/globalErrorHandler";
import userRouter from "./users/userRouter";

const app = express();

//Routes
//hhtp method get post put delete
app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to elib apis" });
});
app.use("/api/users", userRouter);

//global erro handler
app.use(globalErrorhandler);
export default app;
