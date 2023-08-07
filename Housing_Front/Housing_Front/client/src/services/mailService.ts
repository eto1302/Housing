// import nodemailer, { Transporter } from 'nodemailer';
// import smtpTransport from 'nodemailer-smtp-transport';
//
// // Interface for mail options
// interface MailOptions {
//   from: string;
//   to: string;
//   subject: string;
//   html: string;
// }
//
// export class MailService {
//   private transporter: Transporter;
//
//   constructor() {
//     const configMail = require('../bin/config').mail; // Assuming this is a TypeScript file with proper types
//
//     this.transporter = nodemailer.createTransport(
//       smtpTransport({
//         host: configMail.host, // mail.example.com (your server SMTP)
//         port: configMail.port, // 2525 (specific port)
//         secure: configMail.secureConnection, // true or false
//         auth: {
//           user: configMail.auth.user, // user@mydomain.com
//           pass: configMail.auth.pwd // password from the specific user's mail
//         }
//       })
//     );
//   }
//
//   // Method to send mail
//   sendMail(options: MailOptions): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.transporter.sendMail(options, (error, info) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(info);
//         }
//       });
//     });
//   }
//
//   // Close the transporter when not in use
//   closeTransporter(): void {
//     this.transporter.close();
//   }
// }
