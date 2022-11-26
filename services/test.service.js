import { Router } from "express";
import multer from "../utils/multer.js";

const testRouter = Router();

export default (app) => {
    testRouter.post(
        "/image/upload",
        multer.single("image"),
        async (req, res) => {
            res.send("업로드 완료!");
        }
    );

    app.use("/test", testRouter);
};
