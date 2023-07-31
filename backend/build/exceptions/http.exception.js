"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpStatusCode;
(function (HttpStatusCode) {
	HttpStatusCode[(HttpStatusCode["BAD_REQUEST"] = 400)] = "BAD_REQUEST";
	HttpStatusCode[(HttpStatusCode["UNAUTHORIZED"] = 401)] = "UNAUTHORIZED";
	HttpStatusCode[(HttpStatusCode["FORBIDDEN"] = 403)] = "FORBIDDEN";
	HttpStatusCode[(HttpStatusCode["NOT_FOUND"] = 404)] = "NOT_FOUND";
	HttpStatusCode[(HttpStatusCode["INTERNAL_SERVER_ERROR"] = 500)] =
		"INTERNAL_SERVER_ERROR";
	HttpStatusCode[(HttpStatusCode["CONFLICT"] = 409)] = "CONFLICT";
	HttpStatusCode[(HttpStatusCode["TOO_MANY_REQUESTS"] = 429)] =
		"TOO_MANY_REQUESTS";
})(HttpStatusCode || (HttpStatusCode = {}));
class HttpException extends Error {
	constructor(status, message, documentation) {
		super(message);
		this.status = status;
		this.message = message;
		this.documentation = documentation;
	}
}
exports.default = HttpException;
// https://github.com/mwanago/express-typescript/tree/master/src/exceptions
