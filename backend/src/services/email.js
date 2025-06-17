import nodemailer from "nodemailer";

import { EMAIL, EMAIL_PASSWORD } from "../utility/constant.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
    },
});

const mailService = {
    sendMail: async (to, inactiveDays) => {
        const mailOptions = {
            from: {
                name: 'TLE Notification',
                address: EMAIL
            },
            to,
            subject: "Inactivity Alert",
            text: `You have been inactive for ${inactiveDays} days on Codeforces.`,
        };
        try {
            transporter.sendMail(mailOptions);
            console.log("Email sent successfully to:", to);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }
}

export default mailService;