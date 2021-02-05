const nodemailer=require('nodemailer');
var config= {
    host:"smtp.qq.com",
    port:465,
    auth:{
        user:'XXXXXXXXXXX',//发信息邮箱
        pass:'XXXXXXXXXX'//安全码
    }
}
const transporter=nodemailer.createTransport(config);
var sendMail = function(recipient,subject,text){
    transporter.sendMail({
        from:'XXXXXXXXX',
        to:recipient,
        subject:subject,
        text:text
    },function(err,res){
        if(err){
            console.log(err);
        }
        else{
            console.log("发送成功");
        }
    })
}
module.exports =sendMail;