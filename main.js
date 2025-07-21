const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 
const urlencodedParser = express.urlencoded({extended: false});
app.post("/", urlencodedParser, function (req, res) {
    if(!req.body) return response.sendStatus(400);
    res.render("card", { fio: req.body.fio, feast: req.body.feast, gender: req.body.gender, styleSrc: "../css/card.css" });
});
app.post("/download", (req, res) => {
    const puppeteer = require("puppeteer");
    (async () => {
        const browser = await puppeteer.launch({headless: true, args: ["--disable-gpu", "--no-sandbox"]});
        const page = await browser.newPage();
        await page.setCacheEnabled(false);
        await page.goto("http://localhost:3000", ); // Загружаем страницу\
        await page.type('input[name="fio"]', req.body.fio, {delay: 0}); // Заполняем поле
        await page.select('select[name="gender"]', req.body.gender); // Заполняем поле
        await page.select('select[name="feast"]', req.body.feast); // Заполняем поле
        await page.click('button[type="submit"]'); // Нажимаем кнопку отправки\\
        await page.evaluateHandle(() => document.fonts.ready);
        await page.waitForSelector("#card"); // Ждём загрузки
        const card = await page.$("#card",{visible: true});
        if(fs.existsSync('card.png')) fs.unlinkSync('card.png');
        await card.screenshot({ path: "card.png"}); // Делаем скриншот
        await browser.close();
        res.json({success: true});
    })();
});
app.get("/download", (req, res) => {
    res.download("card.png");
});
app.listen(3000);

