import express, { Router } from "express"; // node express 패키지 import
import dotenv from "dotenv"; // 환경변수 패키지
import fs from "fs"; // 파일시스템 패키지
import path from "path"; // path 패키지
import bodyParser from "body-parser";
import { fileURLToPath } from "url"; // url 패키지
import imageUploader from "./services/imageUploader.js";

import db from "./models/index.js";

// path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

// dotenv
dotenv.config();

// express
const app = express();

// bodyParser
app.use(bodyParser.urlencoded({ extended: true })); // body로 들어온 것 parser

(async () => {
    const files = fs.readdirSync(__dirname + "/services").filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.includes("service.js")
        );
    });

    files.map(async (file) => {
        const module = await import(path.join(__dirname + "/services", file));
        module.default(app);
    });
})();

function getTasksPromise() {
    db.Task.findAll()
        .then((tables) => {
            tables.forEach((col) => {
                console.log(col.taskName);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

function getUsersPromise() {
    db.User.findAll()
        .then((tables) => {
            tables.forEach((col) => {
                console.log(col.name);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

// S3에 이미지 업로드
app.post("/image/upload", imageUploader.single("image"), (req, res) => {
    res.send("업로드 완료!");
});

// db에 데이터 삽입하는 예제
app.post("/add", (req, res) => {
    // db.collection("collection 이름")insertOne(Object 자료형, 콜백함수(){});
    db.collection("post").insertOne(
        { title: req.body.title, date: req.body.date },
        function (err, result) {
            console.log("저장완료");
        }
    );
    res.send("전송완료");
});

db.sequelize
    .sync()
    .then(() => {
        console.log(
            `[${process.env.NODE_ENV.toUpperCase()}] 환경모드의 DB에 연결`
        );
        // DB에 연결되면 listen 시작
        app.listen(process.env.PORT, function () {
            console.log("listening on " + process.env.PORT);
            getTasksPromise();
            getUsersPromise();
        });
    })
    .catch((err) => {
        console.log(`Failed to sync db: ${err.message}`);
    });
