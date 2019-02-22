const dotenv = require("dotenv").config();
const nodemailer = require('nodemailer');
const accountSid = process.env.TW_SID;
const authToken = process.env.TW_TOKEN;
const twClient = require('twilio')(accountSid, authToken);

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER , 
        pass: process.env.EMAIL_PASSWORD,
    }
});



module.exports = {

    sendEmail: function (email, subject, text){
        let mailDefaults = {
            from: '"wreck-ur-life" <reckyourlife373@gmail.com>',
            to: email,
            subject: subject, 
            text: text,
        };

        return transporter.sendMail(mailDefaults)
    },
    sendText: function (number, content){
        return twClient.messages
        .create({
           body: String(content),
           from: '+12342030026',
           to: '+1' + number
         })
    }
}

