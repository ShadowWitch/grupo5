"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const user_schema_1 = require("../../../../user/domain/user.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class AuthRouter {
	constructor(authController) {
		this.authController = authController;
		this.path = "/auth";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.post(
			this.path + "/sign-in",
			(0, zod_express_middleware_1.validateRequestBody)(
				user_schema_1.signInSchema
			),
			this.authController.signIn.bind(this.authController)
		);
		this.router.post(
			this.path + "/sign-out",
			authenticate_middleware_1.isAuthenticated,
			this.authController.signOut.bind(this.authController)
		);
		this.router.post(
			this.path + "/desactivate-account",
			authenticate_middleware_1.isAuthenticated,
			this.authController.desactivateAccount.bind(this.authController)
		);
		this.router.post(
			this.path + "/me/change-password",
			authenticate_middleware_1.isAuthenticated,
			this.authController.changePassword.bind(this.authController)
		);
		this.router.get(
			this.path + "/session",
			authenticate_middleware_1.isAuthenticated,
			this.authController.session.bind(this.authController)
		);
		this.router.post(
			this.path + "/recover-account",
			(0, zod_express_middleware_1.validateRequestBody)(
				user_schema_1.userSchema.pick({ email: true })
			),
			this.authController.recoverAccount.bind(this.authController)
		);
		this.router.post(
			this.path + "/reset-password",
			authenticate_middleware_1.isAuthenticated,
			this.authController.resetPassword.bind(this.authController)
		);
	}
}
exports.AuthRouter = AuthRouter;
