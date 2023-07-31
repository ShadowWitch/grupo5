"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const user_schema_1 = require("../../../domain/user.schema");
class UserRouter {
	constructor(userController) {
		this.userController = userController;
		this.path = "/users";
		this.router = (0, express_1.Router)();
		// this.router.use(this.path, isAuthenticated);
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			this.userController.getSeveral.bind(this.userController)
		);
		this.router.get(
			this.path + "/:id",
			(0, zod_express_middleware_1.validateRequestParams)(
				user_schema_1.userSchema.pick({ id: true })
			),
			this.userController.getOne.bind(this.userController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				user_schema_1.userSchema
			),
			this.userController.createOne.bind(this.userController)
		);
		this.router.put(
			this.path + "/:id",
			(0, zod_express_middleware_1.validateRequest)({
				params: user_schema_1.userSchema.pick({ id: true }),
				// body: partialUserSchema,
			}),
			this.userController.updateOneById.bind(this.userController)
		);
		this.router.delete(
			this.path + "/:id",
			(0, zod_express_middleware_1.validateRequestParams)(
				user_schema_1.userSchema.pick({ id: true })
			),
			this.userController.deleteOneById.bind(this.userController)
		);
		this.router.delete(
			this.path,
			this.userController.deleteSeveral.bind(this.userController)
		);
	}
}
exports.UserRouter = UserRouter;
