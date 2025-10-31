import * as nodemailer from 'nodemailer';
// send email 


export async function sendMail(mailOpions:nodemailer.SendMailOptions) {
// create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
     tls: {
    rejectUnauthorized: false,
  },
});

//set mail options
await transporter.sendMail(mailOpions)


}