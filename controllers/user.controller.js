import db from "../models/index.js";

const Controller = {};
const { User, Sequelize } = db;

Controller.getUserInfo = async () => {
    const result = await User.findAll({});

    // DB 데이터 추출
    // db.Task.findAll()
    //     .then((tables) => {
    //         tables.forEach((col) => {
    //             console.log(col.taskName);
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    return result;
};

export default Controller;
