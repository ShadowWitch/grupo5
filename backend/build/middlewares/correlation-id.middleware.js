"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.correlationIdMiddleware = exports.CORRELATION_ID_HEADER = void 0;
const crypto_1 = require("crypto");
exports.CORRELATION_ID_HEADER = "X-Correlation-Id";
const correlationIdMiddleware = (req, res, next) => {
	const correlationId =
		req.headers[exports.CORRELATION_ID_HEADER] ||
		(0, crypto_1.randomUUID)();
	res.setHeader(exports.CORRELATION_ID_HEADER, correlationId);
	next();
};
exports.correlationIdMiddleware = correlationIdMiddleware;
