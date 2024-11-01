import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "path";
import fs from "node:fs";

import bookmodel from "./bookmodel";
import { AuthRequest } from "../middlewares/authenticate";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, genre, description } = req.body;
        //   console.log("files", req.files);

        //image
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };
        const coverImageMimeType = files.coverImage[0].mimetype
            .split("/")
            .at(-1);
        const filename = files.coverImage[0].filename;
        const filepath = path.resolve(
            __dirname,
            "../../public/data/uploads",
            filename
        );

        const uploadResult = await cloudinary.uploader.upload(filepath, {
            filename_override: filename,
            folder: "book-covers",
            format: coverImageMimeType,
        });
        console.log("upload Result", uploadResult);

        //file upload
        const bookFileName = files.file[0].filename;
        const bookFilePath = path.resolve(
            __dirname,
            "../../public/data/uploads",
            bookFileName
        );

        const bookFileUpload = await cloudinary.uploader.upload(bookFilePath, {
            resource_type: "raw",
            filename_override: bookFileName,
            folder: "book-pdf",
            format: "pdf",
        });
        const _req = req as AuthRequest;
        const newBook = await bookmodel.create({
            title: title,
            genre,
            author: _req.userId,
            coverImage: uploadResult.secure_url,
            file: bookFileUpload.secure_url,
        });
        await fs.promises.unlink(filepath);
        await fs.promises.unlink(bookFilePath);
        res.status(201).json({ id: newBook._id });
    } catch (error) {
        console.log("Error", error);
    }
};

export { createBook };
