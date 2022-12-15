import db from "../models/index.js";

const Controller = {};
const { User, Plan } = db;

Controller.getUserInfo = async () => {
    try {
        const result = await User.findAll({});
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Controller.findOrCreate = async (userId) => {
    try {
        const result = await User.findOrCreate({
            where: { userId },
            defaults: {
                userName: "test name",
                userToken: "test token",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Controller.destroy = async () => {
    try {
        Plan.destroy({
            where: {},
            truncate: true,
        });
        return true;
    } catch (error) {
        console.log(error);
    }
};

export default Controller;
