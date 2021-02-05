const puppeteer = require('puppeteer');
const sendMail = require('./mail');
const fs = require("fs");
const path="./data.json";
const delyTime = 6000;
let user=JSON.parse(fs.readFileSync(path).toString());
const userid=user.userid;
const userpassword=user.password;
const email=user.email;
async function run() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://id.sspu.edu.cn/cas/login?service=https%3a%2f%2fhsm.sspu.edu.cn');
    // await page.waitFor(delyTime);
    await page.waitForSelector("#username");
    const userId = await page.$("#username");
    await userId.type(userid, { delay: 1 });
    const password = await page.$("#password");
    await password.type(userpassword, { delay: 1 });
    const submit_button = await page.$("#form1 > div.login-submit-box > button");
    await submit_button.click();//登录
    await page.waitForSelector("#form1 > div:nth-child(6) > ul > li:nth-child(1) > a > div");

    page.on("dialog", async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    })
    const daily_report = await page.$("#form1 > div:nth-child(6) > ul > li:nth-child(1) > a > div");
    await daily_report.click();//点击每日一报
    // page.on("dialog",async dialog=>{
    //     console.log(dialog.message());
    //     await dialog.accept();
    // })

    await page.waitForSelector("#fineui_2-inputEl-icon");
    await page.waitForTimeout(delyTime);
    const health_status = await page.$("#fineui_2-inputEl-icon");
    await health_status.click();//身体状况
    await page.waitForTimeout(delyTime);
    const temPerature = await page.$("#p1_TiWen-inputEl");
    await temPerature.type("35.8");//体温
    await page.waitForTimeout(delyTime);
    const question_one = await page.$("#fineui_13-inputEl-icon");
    await question_one.click();
    await page.waitForTimeout(delyTime);
    const question_two = await page.$("#fineui_15-inputEl-icon");
    await question_two.click();
    await page.waitForTimeout(delyTime);
    const question_three = await page.$("#p1_CheckAddress-inputEl-icon");
    await question_three.click();
    await page.waitForTimeout(delyTime);
    const submit_1 = await page.$("#p1_ctl00_btnSubmit");
    // await page.waitFor(delyTime);
    await submit_1.click();
    await page.waitForTimeout(delyTime);
    //await page.waitFor(delyTime);

    //await page.waitForSelector(".f-panel f-widget-content f-panel-border f-messagebox f-shadow f-corner-all f-window f-messagebox-confirm f-cmp f-widget ui-draggable");
    await page.waitForSelector("#fineui_39");
    const submit_2 = await page.$("#fineui_39");
    await submit_2.click();
    await page.waitForTimeout(delyTime);
    await page.waitForSelector("#fineui_41 > div.f-panel-bodyct > div.f-panel-body.f-widget-content > table > tr > td.f-messagebox-messagect > div");
    
    let result = await page.$eval('#fineui_41 > div.f-panel-bodyct > div.f-panel-body.f-widget-content > table > tr > td.f-messagebox-messagect > div', ele => ele.innerText);
    const butn2=await page.$("#fineui_44");
    await butn2.click();
    await page.waitForTimeout(delyTime);
    await page.waitForSelector("#form1 > div:nth-child(6) > ul > li:nth-child(2) > a > div");
    const butn3=await page.$("#form1 > div:nth-child(6) > ul > li:nth-child(2) > a > div");
    await butn3.click();
    await page.waitForTimeout(delyTime);
    let result2= await page.$eval("#Panel1_DataList1 > ul > li:nth-child(1)",ele=>ele.innerText);
    console.log(result2);
    sendMail(email,"打卡状态:"+result,result2);
    await browser.close();
}
run();