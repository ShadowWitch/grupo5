"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const pino_http_1 = __importDefault(require("pino-http"));
const pino_logger_1 = require("../shared/infrastructure/logger/pino-logger");
const correlation_id_middleware_1 = require("./correlation-id.middleware");
exports.loggerMiddleware = (0, pino_http_1.default)({
	logger: pino_logger_1.logger,
	// autoLogging: false,
	msgPrefix: "[HTTP] ",
	customProps: (req, res) => {
		return {
			correlation:
				req.headers[correlation_id_middleware_1.CORRELATION_ID_HEADER],
		};
	},
	customSuccessMessage(req, res, responseTime) {
		return `"${req.method} ${req.url} HTTP/${req.httpVersion}" ${res.statusCode} ${responseTime}ms`;
	},
	customErrorMessage(req, res, error) {
		return `"${req.method} ${req.url} HTTP/${req.httpVersion}" ${res.statusCode}`;
	},
	timestamp: () => `,"time": "${new Date().toISOString()}"`,
	customLogLevel: function (req, res, err) {
		if (res.statusCode >= 500 || err) return "error";
		if (res.statusCode >= 400) return "warn";
		if (res.statusCode >= 100) return "info";
		if (res.statusCode === 0) return "silent";
		return "debug";
	},
});
