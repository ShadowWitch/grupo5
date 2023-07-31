"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const config_1 = require("../config");
const errorMiddleware = (error, req, res, next) => {
	// req.log.debug(`Error: ${error.status} — ${error.message}`);
	try {
		const status = error.status || 500;
		const message = error.message || "Something went wrong";
		const documentation =
			error.documentation || config_1.projectConfig.documentationUrl;
		console.log(error.stack);
		res.status(status).json({
			error: {
				status,
				message,
				documentation,
			},
		});
	} catch (error) {
		next(error);
	}
};
exports.errorMiddleware = errorMiddleware;
