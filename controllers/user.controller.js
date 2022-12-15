import db from "../models/index.js";
import jwt from "../utils/jwt.js";

const Controller = {};
const { User } = db;

Controller.findId = async (userId) => {
    console.log(userId);
    try {
        const result = await User.findOne({ plain: true, where: { userId } });
        return result;
    } catch (error) {
        console.log(error);
    }
};

Controller.findAll = async () => {
    try {
        const result = await User.findAll({});
        return result;
    } catch (error) {
        console.log(error);
    }
};

Controller.findOrCreate = async (params) => {
    const { userId, userName, userToken } = params;
    try {
        const [result, created] = await User.findOrCreate({
            where: { userId },
            defaults: {
                userName,
                userToken,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        if (created) {
            return result;
        } else {
            return created;
        }
    } catch (error) {
        console.log(error);
    }
};

Controller.findToken = async (userId) => {
    try {
        const result = await User.findOne({ raw: true, where: { userId } });
        return result;
    } catch (error) {
        console.log(error);
    }
};

Controller.findRefreshToken = async (token) => {
    try {
        const result = await User.findOne({ raw: true, where: { userToken: token } });
        const { userId, userName, userToken } = result;
        if (userToken == token) {
            const jwtAccessToken = await jwt.sign({ userId, userName });
            return jwtAccessToken;
        }
    } catch (error) {
        console.log(error);
    }
};

Controller.findUserRefreshToken = async (userId) => {
    try {
        const result = await User.update({ userToken: refreshToken }, { where: { userId } });
        return result.userToken;
    } catch (error) {
        console.log(error);
    }
};

export default Controller;
