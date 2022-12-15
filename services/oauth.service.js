import { Router } from "express";
import qs from "qs";
import axios from "axios";

import jwt from "../utils/jwt.js";
import kakaoAuth from "../utils/KakaoAuth.js";
import userController from "../controllers/user.controller.js";

axios.defaults.withCredentials = true;

const oauthRouter = Router();

export default (app) => {
    oauthRouter.post("/decode", async (req, res) => {
        const { token } = req.cookies;
        const payload = await jwt.verify(token);
        console.log(payload);
        res.send(payload);
    });

    // front에 verify code 전달을 통한 토큰 정보 받기
    oauthRouter.get("/callback/kakao", async (req, res) => {
        const { code } = req.query;
        try {
            const kakaoTokenInfo = await axios({
                method: "POST",
                url: "https://kauth.kakao.com/oauth/token",
                headers: {
                    "Accept-Encoding": "deflate, br",
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
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

            const result = await userController.findOrCreate({
                userId: kakaoUserInfo.id,
                userName: kakaoUserInfo.properties.nickname,
                userToken: jwtRefreshToken,
            });

            if (result) {
                res.cookie("jwtRefreshToken", jwtRefreshToken, {
                    sameSite: "none",
                    secure: true,
                })
                    .status(200)
                    .send({
                        success: true,
                        jwtAccessToken,
                    });
            } else {
                const userInfo = await userController.findId(kakaoUserInfo.id);
                const { userToken, userId } = userInfo;
                const verifyResult = await jwt.verify(userToken);
                if (verifyResult) {
                    res.cookie("jwtRefreshToken", userToken, {
                        sameSite: "none",
                        secure: true,
                    })
                        .status(200)
                        .send({
                            success: true,
                            message: "이미 아이디가 생성 되었습니다. 회원가입 없이 로그인 하겠습니다.",
                        });
                } else {
                    const refreshedToken = userController.findUserRefreshToken(userId);
                    res.cookie("jwtRefreshToken", refreshedToken, {
                        sameSite: "none",
                        secure: true,
                    })
                        .status(200)
                        .send({
                            success: true,
                            message: "토큰 에러로 리프레쉬 토큰을 재발급합니다.",
                        });
                }
            }
        } catch (error) {
            console.log(error);
        }
    });

    app.use("/oauth", oauthRouter);
};
