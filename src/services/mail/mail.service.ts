import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

import { ActionEnum } from '../../constants';
import { config } from '../../config';
import { htmlTemplates } from '../../email-templates';

const contextEctension = {
  frontendUrl: config.FRONTEND_URL
};

const transporter = nodemailer.createTransport({
  service: config.ROOT_EMAIL_SERVICE,
  auth: {
    user: config.ROOT_EMAIL,
    pass: config.ROOT_EMAIL_PASSWORD
  }
});

try {
  transporter.verify();
  console.log('Mail connection verified');
} catch (err) {
  console.error(`Mail connection not verified. Error: ${JSON.stringify(err)}`);
}

const getTemplate = (data: any, type: string): any => {
  const file = fs.readFileSync(path.resolve(__dirname, '../../', 'email-templates',`${type}.hbs`));
  const source = file.toString();
  const template = handlebars.compile(source);
  const result = template({ ...data, ...contextEctension });

  return result;
};

class MailService {
  async sendEmailService(email: string, action: ActionEnum, context: any = {}): Promise<any> {
    const templateInfo = htmlTemplates[action];

    const html = getTemplate(context, templateInfo.templateFileName);
    const messageData = {
      from: `no-reply<${config.ROOT_EMAIL}>`,
      to: email,
      subject: templateInfo.subject,
      html
    };
    try {
      const result = await transporter.sendMail(messageData);
      console.log(`Mail send successfull. Data: ${JSON.stringify(result)}`);

      return result;
    } catch (err) {
      console.error(`Mail send failed. Error: ${JSON.stringify(err)}`);
    }

  }
}

export const emailService = new MailService();
