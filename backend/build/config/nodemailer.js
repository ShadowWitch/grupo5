"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("./env");
exports.default = nodemailer_1.default.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	auth: {
		user: env_1.env.EMAIL_FROM_ADDRESS_NO_REPLY,
		pass: env_1.env.GOOGLE_GMAIL_PASSWORD,
	},
});
