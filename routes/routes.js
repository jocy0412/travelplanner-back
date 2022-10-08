import { Router } from "express";
var router = Router();

router.get("/shirts", async (req, res) => {
    res.send("셔츠 파는 페이지입니다.");
});

router.get("/pants", async (req, res) => {
    res.send("바지 파는 페이지입니다.");
});

module.exports = router;
