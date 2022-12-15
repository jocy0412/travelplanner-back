import { Router } from "express";
import jwt from "../utils/jwt.js";
import userController from "../controllers/user.controller.js";

const userRouter = Router();

export default (app) => {
    userRouter.get("/findAll", async (req, res) => {
        try {
            const user = await userController.findAll();
            res.send(user);
        } catch (error) {
            console.log(error);
        }
    });
    userRouter.get("/getAccessToken", async (req, res) => {
        try {
            const { jwtRefreshToken } = req.cookies;
            if (jwtRefreshToken) {
                const getAccessToken = await userController.findRefreshToken(jwtRefreshToken);
                res.send(getAccessToken);
            } else {
                res.status(403).send("refresh Token not have");
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    });

    app.use("/user", userRouter);
};
