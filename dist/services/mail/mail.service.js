"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const config_1 = require("../../config");
const email_templates_1 = require("../../email-templates");
const contextEctension = {
    frontendUrl: config_1.config.FRONTEND_URL
};
const transporter = nodemailer.createTransport({
    service: config_1.config.ROOT_EMAIL_SERVICE,
    auth: {
        user: config_1.config.ROOT_EMAIL,
        pass: config_1.config.ROOT_EMAIL_PASSWORD
    }
});
try {
    transporter.verify();
    console.log('Mail connection verified');
}
catch (err) {
    console.error(`Mail connection not verified. Error: ${JSON.stringify(err)}`);
}
const getTemplate = (data, type) => {
    const file = fs.readFileSync(path.resolve(__dirname, '../../', 'email-templates', `${type}.hbs`));
    const source = file.toString();
    const template = handlebars.compile(source);
    const result = template({ ...data, ...contextEctension });
    return result;
};
class MailService {
    async sendEmailService(email, action, context = {}) {
        const templateInfo = email_templates_1.htmlTemplates[action];
        const html = getTemplate(context, templateInfo.templateFileName);
        const messageData = {
            from: `no-reply<${config_1.config.ROOT_EMAIL}>`,
            to: email,
            subject: templateInfo.subject,
            html
        };
        try {
            const result = await transporter.sendMail(messageData);
            console.log(`Mail send successfull. Data: ${JSON.stringify(result)}`);
            return result;
        }
        catch (err) {
            console.error(`Mail send failed. Error: ${JSON.stringify(err)}`);
        }
    }
}
exports.emailService = new MailService();
//# sourceMappingURL=mail.service.js.map