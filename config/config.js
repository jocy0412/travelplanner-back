import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV;

const development = {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: process.env.MYSQL_DIALECT,
    dialectOptions: {
        bigNumberStrings: true,
    },
};

const production = {
    username: process.env.AWS_RDS_HOSTNAME,
    password: process.env.AWS_RDS_PASSWORD,
    database: process.env.AWS_RDS_DATABASE,
    host: process.env.AWS_RDS_HOST,
    port: process.env.AWS_RDS_PORT,
    dialect: process.env.AWS_RDS_DIALECT,
    dialectOptions: {
        bigNumberStrings: true,
    },
};

const test = {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: process.env.MYSQL_DIALECT,
    dialectOptions: {
        bigNumberStrings: true,
    },
};

const config = {
    development,
    production,
    test,
};

export default config[env];
