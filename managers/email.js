const nodemailer = require("nodemailer");
const emailManager = async (to, text, html, subject) => {
     // nodemailer
     var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.email_user,
          pass: process.env.email_pass
        }
        
    });

    await transport.sendMail({
        to: to,
        from: "info@expensetracker.com",
        text: text,
        html: html,
        subject: subject,
    })


}

module.exports = emailManager;