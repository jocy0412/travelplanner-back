import express, { response, Router } from "express"; // node express 패키지 import
import cors from "cors";
import dotenv from "dotenv"; // 환경변수 패키지
import fs from "fs"; // 파일시스템 패키지
import path from "path"; // path 패키지
import { fileURLToPath } from "url"; // url 패키지
import db from "./models/index.js";
import cookieParser from "cookie-parser";
import https from "https";

// path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

// dotenv
dotenv.config();

// express
const app = express();

// cors
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

// bodyParser - Express 4.16.0 이전 버전
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // body로 들어온 것 parser

// bodyParser - Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장
// req.body로 들어온 것 parser
app.use(express.json());
// // x-www-form-urlencoded 타입의 post 요청을 파싱해줌
app.use(express.urlencoded({ extended: true }));

// cookie-parser - cookie 사용을 위해
app.use(cookieParser());

// services 폴더 내의 파일 import
(async () => {
    const files = fs.readdirSync(__dirname + "/services").filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.includes("service.js")
        );
    });
    // services 폴더의 service.js 파일들 import
    files.map(async (file) => {
        const module = await import(path.join(__dirname + "/services", file));
        module.default(app);
    });
})();

// localhost 작업을 위한 인증서 추가
const options = {
    key: fs.readFileSync("./localhost-key.pem"), // 키
    cert: fs.readFileSync("./localhost.pem"), // 인증서
};

const httpsServer = https.createServer(options, app);

db.sequelize
    .sync()
    .then(() => {
        console.log(
            `[${process.env.NODE_ENV.toUpperCase()}] 환경모드의 DB에 연결`
        );
        // DB에 연결되면 listen 시작
        httpsServer.listen(process.env.PORT, () => {
            console.log("HTTPS server listening on " + process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(`Failed to sync db: ${err.message}`);
    });
