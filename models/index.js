"use strict";
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "../config/config.js";
import { fileURLToPath } from "url"; // url 패키지
import { createRequire } from "module";

// path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

// require
const require = createRequire(import.meta.url);

const db = {};

let sequelize;

sequelize = new Sequelize({
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
});

(async () => {
    const files = fs.readdirSync(__dirname).filter((file) => {
        return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
    });

    await files.map(async (file) => {
        const module = await import(path.join(__dirname, file));
        const model = module.default(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
