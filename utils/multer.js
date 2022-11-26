import { Router } from "express";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-S3";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

export default multer({
    storage: multerS3({
        s3: s3,
        bucket: "myawstravel", // aws 생성한 버킷 이름
        acl: "public-read-write",
        key: (req, file, callback) => {
            const uploadDirectory = req.query.directory ?? "image";
            const extension = path.extname(file.originalname);
            const baseName = path.basename(
                file.originalname,
                ".png" || ".jpg" || ".jpeg" || ".bmp"
            );
            if (!allowedExtensions.includes(extension)) {
                return callback(new Error("wrong extension"));
            }
            callback(
                null,
                `/${uploadDirectory}/${baseName}_${Date.now()}${extension}`
            );
        },
    }),
});
