import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const auth = {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        };
        console.log("Attempting to send email with credentials: ", auth);
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth,
        });

        const mailOptions = {
            from: "support@lobowebsites.com",
            to: "carlosvillalobos1047@gmail.com",
            subject: body.subject,
            html: body.html,
            attachments: body.attachments,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw error;
            } else {
                console.log("Email sent: ", info.response);
            }
        });

        return {
            message: "Message sent.",
            mailOptions,
        };
    } catch (err) {
        return JSON.parse(err);
    }
});
