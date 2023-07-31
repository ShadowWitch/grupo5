"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSender = exports.logger = void 0;
const config_1 = require("../../config");
const gmail_email_sender_1 = require("./email-sender/gmail-email-sender");
const mailtrap_email_sender_1 = require("./email-sender/mailtrap-email-sender");
const pino_logger_1 = require("./logger/pino-logger");
const logger = new pino_logger_1.PinoLogger();
exports.logger = logger;
let emailSender;
const NODE_ENV = {
	PRODUCTION: "production",
	DEVELOPMENT: "development",
};
if (config_1.projectConfig.server.enviroment === NODE_ENV.PRODUCTION) {
	exports.emailSender = emailSender =
		new gmail_email_sender_1.GmailEmailSender(logger);
} else {
	exports.emailSender = emailSender =
		new mailtrap_email_sender_1.MailtrapEmailSender(logger);
}
