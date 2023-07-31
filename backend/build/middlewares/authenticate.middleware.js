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
exports.isAuthenticated = void 0;
const exceptions_1 = require("../exceptions");
const user_dependencies_1 = __importDefault(
	require("../modules/user/infrastructure/user-dependencies")
);
const jwt_1 = require("../shared/infrastructure/jwt");
// import { logger } from "../utils/logger";
const token = jwt_1.Token.instance;
const isAuthenticated = (req, res, next) =>
	__awaiter(void 0, void 0, void 0, function* () {
		var _a;
		try {
			const userToken =
				(_a = req.headers.authorization) === null || _a === void 0
					? void 0
					: _a.split("Bearer ")[1];
			if (!userToken)
				throw new exceptions_1.UnauthorizedException(
					"No token provided"
				);
			const validToken = token.verify(userToken);
			if (!validToken) throw new exceptions_1.UnauthorizedException();
			try {
				const userId = validToken.payload.user;
				const userAuth =
					yield user_dependencies_1.default.services.findById(userId);
				if (!userAuth.enabled)
					throw new exceptions_1.UnauthorizedException();
				req.user = userAuth;
			} catch (error) {
				throw (error.message = "Token is not valid or expired");
			}
			next();
		} catch (error) {
			next(error);
		}
	});
exports.isAuthenticated = isAuthenticated;
