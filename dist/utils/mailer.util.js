"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerUtil = void 0;
const nodeMailer = require("nodemailer");
class MailerUtil {
    constructor() {
        this.mailHost = 'smtp.gmail.com';
        this.mailPort = 587;
    }
    async sendMail(email, password, to, subject, htmlContent) {
        const transporter = nodeMailer.createTransport({
            host: this.mailHost,
            port: this.mailPort,
            secure: false,
            auth: {
                user: email,
                pass: password,
            },
        });
        const options = {
            from: email,
            to,
            subject,
            html: htmlContent,
        };
        return transporter.sendMail(options);
    }
}
exports.MailerUtil = MailerUtil;
//# sourceMappingURL=mailer.util.js.map