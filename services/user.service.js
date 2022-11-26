import { Router } from "express";
import Controller from "../controllers/user.controller.js";
import users from "../controllers/user.controller.js";

const userRouter = Router();

export default (app) => {
    userRouter.get("/info", async (req, res) => {
        const user = await users.getUserInfo();
        res.send(user);
    });

    console.log("user service.js 사용중");

    app.use("/user", userRouter);
};
