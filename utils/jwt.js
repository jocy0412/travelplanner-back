import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userController from "../controllers/user.controller.js";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
const algorithm = process.env.JWT_ALG;
const accessExpiresIn = process.env.JWT_ACCESS_EXP;
const refreshExpiresIn = process.env.JWT_REFRESH_EXP;
const issuer = process.env.JWT_ISSUER;
const options = { expiresIn: accessExpiresIn, algorithm, issuer };
const optionsRefresh = { expiresIn: refreshExpiresIn, algorithm, issuer };

const JWT = {
    sign: (payload) => {
        try {
            return jwt.sign(payload, secretKey, options);
        } catch (error) {
            return console.log(error);
        }
    },
    verify: (token) => {
        try {
            return jwt.verify(token, secretKey);
        } catch (error) {
            console.log(error);
        }
    },
    refresh: () => {
        try {
            return jwt.sign({}, secretKey, optionsRefresh);
        } catch (error) {
            console.log(error);
        }
    },
    refreshVerify: async (token, id) => {
        try {
            const getToken = await userController.findToken(id); // refresh token 가져오기
            if (getToken == token) {
                try {
                    jwtUtil.verify(token, secret);
                    return true;
                } catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    },
};

export default JWT;
