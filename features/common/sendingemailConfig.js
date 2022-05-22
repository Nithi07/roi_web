
exports.FP_TASK_EMAIL_ID = 'fpapptask@gmail.com';

var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    //host: "smtp.gmail.com",
    secure: false,//true
    port: 25,//465
    pool: true,
    auth: {
        user: "fpapptask@gmail.com",
        pass: "Fpapp@321"
    }, tls: {
        rejectUnauthorized: false
      }
});

exports.sendingMail = function(req,res){
    var isSuccess = false;
    smtpTransport.sendMail(req, function(error, response){
   	         if(error){
                console.log(error);
                return res(null,isSuccess);
            }else{
                console.log("Successs");
                isSuccess = true;
                return res(null,isSuccess);
            }
       });
        
}
