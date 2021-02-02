const puppeteer = require('puppeteer');
const delyTime=6000;

async function run(){
    const browser = await puppeteer.launch({
        headless:false
    });
    const page=await browser.newPage();
    await page.goto('https://id.sspu.edu.cn/cas/login?service=https%3a%2f%2fhsm.sspu.edu.cn');
    await page.waitFor(delyTime);
    const userId=await page.$("#username");
    await userId.type("20191110602",{ delay: 1 });
    const password=await page.$("#password");
    await password.type("123456789qqq",{ delay: 1 });
    const submit_button=await page.$("#form1 > div.login-submit-box > button");
    await submit_button.click();//登录
    await page.waitFor(delyTime);
    
    page.on("dialog",async dialog=>{
        console.log(dialog.message());
        await dialog.accept();
    })
    const daily_report = await page.$("#form1 > div:nth-child(6) > ul > li:nth-child(1) > a > div");
    await daily_report.click();//点击每日一报
    // page.on("dialog",async dialog=>{
    //     console.log(dialog.message());
    //     await dialog.accept();
    // })
    
    await page.waitFor(delyTime);
    page.on("dialog",async dialog=>{
        console.log(dialog.message());
        await dialog.accept();
    });
    const health_status = await page.$("#fineui_2-inputEl-icon");
    await health_status.click();//身体状况
    const temPerature = await page.$("#p1_TiWen-inputEl");
    await temPerature.type("35.8");//体温
    const question_one = await page.$("#fineui_13-inputEl-icon");
    await question_one.click();
    const question_two = await page.$("#fineui_15-inputEl-icon");
    await question_two.click();
    const question_three = await page.$("#p1_CheckAddress-inputEl-icon");
    await question_three.click();
    const submit_1 =await page.$("#p1_ctl00_btnSubmit");
    await page.waitFor(delyTime);
    submit_1.click();
    await page.waitFor(delyTime);
    const submit_2 =await page.$("#fineui_39");
    submit_2.click();
}
run();