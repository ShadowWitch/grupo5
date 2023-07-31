"use strict";
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step(
				(generator = generator.apply(thisArg, _arguments || [])).next()
			);
		});
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailtrapEmailSender = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../../../config/env");
class MailtrapEmailSender {
	constructor(logger) {
		this.logger = logger;
	}
	sendEmail(to, subject, text, html) {
		return __awaiter(this, void 0, void 0, function* () {
			this.logger.info(`Sending "${subject}" email to ${to}`);
			const mailOptions = {
				from: env_1.env.EMAIL_FROM_ADDRESS_NO_REPLY,
				to,
				subject,
				text,
				html,
			};
			const transporter = nodemailer_1.default.createTransport({
				host: env_1.env.MAILTRAP_HOST,
				port: env_1.env.MAILTRAP_PORT,
				auth: {
					user: env_1.env.MAILTRAP_USER,
					pass: env_1.env.MAILTRAP_PASSWORD,
				},
			});
			try {
				const info = yield transporter.sendMail(mailOptions);
				this.logger.info(`Email sent: ${info.messageId}`);
			} catch (error) {
				this.logger.error(`Error sending email: ${error}`);
			}
		});
	}
}
exports.MailtrapEmailSender = MailtrapEmailSender;
