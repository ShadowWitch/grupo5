"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
const forbidden_exception_1 = __importDefault(
	require("../exceptions/forbidden.exception")
);
const isAuthorized = (who) => (req, res, next) => {
	try {
		const userType = req.user.type;
		if (!who.includes(userType)) throw new forbidden_exception_1.default();
		next();
	} catch (error) {
		next(error);
	}
};
exports.isAuthorized = isAuthorized;
// https://javascript.plainenglish.io/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4
// https://github.com/cornflourblue/node-mongo-signup-verification-api/blob/master/package.json
