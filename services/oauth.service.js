import { Router } from "express";
import kakaoAuth from "../utils/KakaoAuth.js";
import { makeToken, decodePayload } from "../utils/jwt.js";

const oauthRouter = Router();

export default (app) => {
    oauthRouter.post("/callback/kakao", async (req, res) => {
        const { token } = req.body;
        const response = await kakaoAuth(token);
        console.log("kakao for OAuth id");
        console.log(response.id);
        const madeToken = await makeToken({ id: response.id });
        console.log("토큰 만들기");
        console.log(madeToken);

        res.status(200).json({ success: true, jwt: madeToken });
    });

    oauthRouter.post("/decode", async (req, res) => {
        const { token } = req.body;
        // console.log(req.body.token);
        const payload = await decodePayload(token);
        console.log(payload);
        res.send(payload);
    });

    app.use("/oauth", oauthRouter);
};
