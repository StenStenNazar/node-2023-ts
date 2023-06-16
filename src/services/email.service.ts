import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";

import { allEmailActions } from "../constants/email.constants";
import { EEmailActions } from "../enums/email.enams";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No replay",
      service: "gmail",
      auth: {
        user: "naziksten@gmail.com",
        pass: "yxweufhuozjxefob",
      },
    });

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email.templates",
          "layouts"
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email.templates",
          "partials"
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email.templates", "views"),
      extName: ".hbs",
    };
    this.transporter.use("compile", hbs(hbsOptions));
  }

  public async sendMail(
    email: string,
    emailAction: EEmailActions,
    context: Record<string, string | number> = {}
  ) {
    const { templateName, subject } = allEmailActions[emailAction];
    const mailOptions = {
      to: email,
      subject,
      template: templateName,
      context,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
export const emailService = new EmailService();
