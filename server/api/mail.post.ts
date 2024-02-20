import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: "support@lobowebsites.com",
            to: "carlosvillalobos1047@gmail.com",
            subject: body.subject,
            html: body.html,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw error;
            } else {
                console.log("Email sent: ", info.response);
            }
        });

        return "Message sent.";
    } catch (err) {
        return JSON.parse(err);
    }
});
