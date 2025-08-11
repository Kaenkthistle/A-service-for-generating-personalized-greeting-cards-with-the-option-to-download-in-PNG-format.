const { v4: uuidv4 } = require('uuid');
const filename = `${uuidv4()}.png`;
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
        const arrFeasts = ["ny", "dr", "prog", "8m", "23v","dsv"];
        if(!req.body.fio || !req.body.gender || !req.body.feast) return res.status(400).json({success: false, message: "Заполните все необходимые поля"});
        if(req.body.fio.length===0 || !arrFeasts.includes(req.body.feast) || !["male", "female"].includes(req.body.gender)||
        req.body.gender==="male" && req.body.feast==="8m" || req.body.gender==="female" && req.body.feast==="23f")
        return res.status(400).json({success: false, message: "Введите корректные значения"});
        await page.goto(`${req.protocol}://${req.get('host')}`); // Загружаем страницу\
        await page.type('input[name="fio"]', req.body.fio, {delay: 0}); // Заполняем поле
        await page.select('select[name="gender"]', req.body.gender); // Заполняем поле
        await page.select('select[name="feast"]', req.body.feast); // Заполняем поле
        await page.click('button[type="submit"]'); // Нажимаем кнопку отправки\\
        await page.evaluateHandle(() => document.fonts.ready);
        await page.waitForSelector("#card"); // Ждём загрузки
        const card = await page.$("#card",{visible: true});
        await card.screenshot({ path: filename}); // Делаем скриншот
        await browser.close();
        res.download(filename);
    })();
});
app.get("/download", (req, res) => {
    if (filename) res.download(filename, () => fs.unlink(filename, () => {}));
});
app.listen(3000);

