import { Router } from "express";
import multer from "../utils/multer.js";
import testController from "../controllers/test.controller.js";

const testRouter = Router();

export default (app) => {
    testRouter.post("/image/upload", multer.single("image"), async (req, res) => {
        res.send("업로드 완료!");
    });
    testRouter.get("/userInfo", async (req, res) => {
        const result = await testController.getUserInfo();
        console.log(result);
        res.send(result);
    });

    testRouter.post("/create", async (req, res) => {
        const { userId } = req.query;
        const result = await testController.findOrCreate(userId);
        console.log(result);
        res.send(result);
    });

    testRouter.post("/destroy", async (req, res) => {
        const { userId } = req.query;
        const result = await testController.destroy();
        console.log(result);
        res.send(result);
    });

    app.use("/test", testRouter);
};
