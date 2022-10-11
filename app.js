import express, { Router } from "express"; // node express 패키지 import
import bodyParser from "body-parser";
import { MongoClient } from "mongodb"; // mongodb 패키지
import dotenv from "dotenv"; // 환경변수 패키지
import imageUploader from "./services/imageUploader.js";
import path from "path"; // path 패키지
import { fileURLToPath } from "url"; // url 패키지

// path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv
dotenv.config();

// express
const app = express();

// bodyParser
app.use(bodyParser.urlencoded({ extended: true })); // body로 들어온 것 parser

// DB
var db;

MongoClient.connect(process.env.DB_URL, (error, client) => {
    if (error) return console.log(error);

    db = client.db("todoapp");
    // mongodb 연결되면 listen 시작(서버 실행)
    app.listen(process.env.PORT, function () {
        console.log("listening on " + process.env.PORT);
    });
});

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
