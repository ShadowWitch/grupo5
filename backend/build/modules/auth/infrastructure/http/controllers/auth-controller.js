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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
	constructor(authService) {
		this.authService = authService;
	}
	signIn(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const userCredentials = req.body;
				const userSigned = yield this.authService.signIn(
					userCredentials
				);
				const httpResponse = {
					user: userSigned.user,
					token: userSigned.token,
					message: "User signed in",
				};
				res.status(200).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
	signOut(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const userLogged = req.user;
				const userSignedOut = yield this.authService.signOut(
					userLogged
				);
				const httpResponse = {
					data: userSignedOut,
					message: "User signed out",
				};
				res.status(200).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
	session(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const userLogged = req.user;
				const userSession = yield this.authService.session(userLogged);
				const httpResponse = {
					data: userLogged,
					message: "User session",
				};
				res.status(200).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
	desactivateAccount(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const { id } = req.user;
				const userDesativated =
					yield this.authService.desactivateAccount(id);
				const httpResponse = {
					data: userDesativated,
					message: "User desactivated",
				};
				res.status(200).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
	changePassword(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const { password } = req.body;
				const { id, password: oldPassword } = req.user;
				const userChangedPassword =
					yield this.authService.changePassword(
						id,
						oldPassword,
						password
					);
				const httpResponse = {
					data: userChangedPassword,
					message: "Password changed",
				};
				res.status(200).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
	recoverAccount(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const { email } = req.body;
				const userFound = yield this.authService.forgotPassword(email);
				const httpResponse = {
					message: userFound && "Email sent",
				};
				res.status(200).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
	resetPassword(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const { new_password } = req.body;
				const { id } = req.user;
				console.log("id", id);
				console.log("new_password", new_password);
				const userResetedPassword =
					yield this.authService.resetPassword(id, new_password);
				const httpResponse = {
					data: userResetedPassword,
					message: "Password reseted",
				};
				res.status(200).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.AuthController = AuthController;
