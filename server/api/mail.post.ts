import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const auth = {
            user: process.env.FROM_EMAIL_USER,
            pass: process.env.FROM_EMAIL_PASS,
        };
        console.log("Attempting to send email with credentials: ", auth);
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth,
        });

        const mailOptions = {
            from: "support@lobowebsites.com",
            to: process.env.TO_EMAIL_USER,
            subject: body.subject,
            html: body.html,
            attachments: [],
        };

        if (body.attachments) {
            for (const attachment of body.attachments) {
                mailOptions.attachments.push({
                    filename: attachment.filename,
                    content: attachment.content,
                    encoding: "base64",
                });
            }
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw error;
            } else {
                console.log("Email sent: ", info.response);
            }
        });

        return {
            message: "Message sent successfully.",
            mailOptions: {
                from: mailOptions.from,
                to: mailOptions.to,
                subject: mailOptions.subject,
                html: mailOptions.html,
                attachmentCount: mailOptions.attachments.length,
            },
        };
    } catch (err) {
        return JSON.parse(err);
    }
});
