import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
const algorithm = process.env.JWT_ALG;
const expiresIn = process.env.JWT_EXP;
const issuer = process.env.JWT_ISSUER;
const options = { algorithm, expiresIn, issuer };

function makeToken(payload) {
    try {
        return jwt.sign(payload, secretKey, options);
    } catch (error) {
        return error;
    }
}

function decodePayload(token) {
    return jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
            console.log(err);
        }
        return decoded;
    });
}

export { makeToken, decodePayload };
