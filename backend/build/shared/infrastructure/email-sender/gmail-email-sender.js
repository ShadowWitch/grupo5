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
exports.GmailEmailSender = void 0;
const env_1 = require("../../../config/env");
const nodemailer_1 = __importDefault(require("../../../config/nodemailer"));
class GmailEmailSender {
	constructor(logger) {
		this.logger = logger;
	}
	sendEmail(to, subject, text, html) {
		return __awaiter(this, void 0, void 0, function* () {
			this.logger.info(`Sending ${subject} email to ${to}`);
			const mailOptions = {
				from: env_1.env.EMAIL_FROM_NAME_NO_REPLY,
				to,
				subject,
				text,
				html,
			};
			try {
				nodemailer_1.default.sendMail(mailOptions);
				this.logger.info(`Email sent: ${mailOptions}`);
			} catch (error) {
				this.logger.error(`Error sending email: ${error}`);
			}
		});
	}
}
exports.GmailEmailSender = GmailEmailSender;
