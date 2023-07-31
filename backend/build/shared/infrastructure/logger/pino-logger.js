"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinoLogger = exports.logger = void 0;
const pino_1 = require("pino");
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const levels = {
	http: 10,
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	fatal: 60,
};
const prettyStream = (0, pino_pretty_1.default)({
	colorize: true,
	messageKey: "message",
});
exports.logger = (0, pino_1.pino)(
	{
		level: process.env.PINO_LOG_LEVEL || "info",
		customLevels: levels,
		useOnlyCustomLevels: true,
		messageKey: "message",
		timestamp: () => `,"time": "${new Date().toISOString()}"`,
	},
	{
		write(msg) {
			prettyStream.write(msg);
		},
	}
);
class PinoLogger {
	info(message) {
		exports.logger.info(message);
	}
	error(message) {
		exports.logger.error(message);
	}
	warn(message) {
		exports.logger.warn(message);
	}
	debug(message) {
		exports.logger.debug(message);
	}
	fatal(message) {
		exports.logger.fatal(message);
	}
}
exports.PinoLogger = PinoLogger;
