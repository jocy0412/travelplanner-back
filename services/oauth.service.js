import { Router } from "express";
import kakaoAuth from "../utils/KakaoAuth.js";
import jwt from "../utils/jwt.js";
import userController from "../controllers/user.controller.js";
import qs from "qs";
import axios from "axios";

axios.defaults.withCredentials = true;

const oauthRouter = Router();

export default (app) => {
    // front에 verify code 전달을 통한 토큰 정보 받기
    oauthRouter.get("/callback/kakao", async (req, res) => {
        const { code } = req.query;
        try {
            const kakaoTokenInfo = await axios({
                method: "POST",
                url: "https://kauth.kakao.com/oauth/token",
                headers: {
                    "Accept-Encoding": "deflate, br",
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
                data: qs.stringify({
                    grant_type: "authorization_code",
                    client_id: process.env.KAKAO_CLIENT_ID,
                    redirect_uri: "https://localhost:3000/oauth/callback/kakao",
                    code,
                }),
            });
            const { access_token } = kakaoTokenInfo.data;
            const kakaoUserInfo = await kakaoAuth(access_token);
            const jwtAccessToken = await jwt.sign({
                userId: kakaoUserInfo.id,
                userName: kakaoUserInfo.properties.nickname,
            });
            const jwtRefreshToken = await jwt.refresh();
            console.log("jwtAccessToken : " + jwtAccessToken);
            console.log("jwtRefreshToken : " + jwtRefreshToken);

            res.cookie("jwtRefreshToken", jwtRefreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
                .status(200)
                .send("jwtRefreshToken 전송 성공");
        } catch (error) {
            console.log(error);
        }
    });

    oauthRouter.get("/test", async (req, res) => {
        console.log(req.query);
        console.log("test cookie");

        res.cookie("myCookie", "setCookie");
        res.send("성공");
    });

    oauthRouter.post("/decode", async (req, res) => {
        const { token } = req.body;
        // console.log(req.body.token);
        const payload = await verify(token);
        console.log(payload);
        res.send(payload);
    });

    app.use("/oauth", oauthRouter);
};
