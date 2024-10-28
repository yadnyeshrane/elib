import express from "express";

const app = express();

//Routes
//hhtp method get post put delete
app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to elib apis" });
});
export default app;
