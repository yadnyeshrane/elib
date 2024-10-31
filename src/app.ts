import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/conifg";
import globalErrorhandler from "./middlewares/globalErrorHandler";
import userRouter from "./users/userRouter";
import bookRouter from "./books/bookRouter";

const app = express();

//Routes
//hhtp method get post put delete
app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to elib apis" });
});
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

//global erro handler
app.use(globalErrorhandler);
export default app;
