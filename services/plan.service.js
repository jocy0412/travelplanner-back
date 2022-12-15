import { Router } from "express";
import planController from "../controllers/plan.controller.js";

const planRouter = Router();

export default (app) => {
    planRouter.get("/find", async (req, res) => {
        console.log("find 동작");
        const { planId } = req.query;
        try {
            const result = await planController.findPlan(planId);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    });

    planRouter.post("/change", async (req, res) => {
        console.log("change 동작");
        const { plan } = req.query;
        try {
            const result = await planController.change(plan);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
        // res.send("성공");
    });

    planRouter.post("/add", async (req, res) => {
        console.log("add 동작");
        try {
            const result = await planController.add(req.query);
            if (result) {
                res.status(200).send("OK");
            } else {
                res.status(401).send("Fail");
            }
        } catch (error) {
            console.log(error);
        }
    });

    planRouter.post("/delete", async (req, res) => {
        console.log("delete 동작");
        try {
            const deleteResult = await planController.delete(req.query);
            if (deleteResult) {
                res.status(200).send("OK");
            } else {
                res.status(401).send("Fail");
            }
        } catch (error) {
            console.log(error);
        }
        // res.send("성공");
    });

    app.use("/plan", planRouter);
};
