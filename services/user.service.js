import { Router } from "express";
import Controller from "../controllers/user.controller.js";
// import cards from "../controllers/card.controller.js";
// import upload, { bucket } from "./multer.js";

const router = Router();

export default (app) => {
    console.log("user service.js 사용중");
    console.log(Controller);

    app.use("/user", router);
};
