"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const user_role_schema_1 = require("../../../domain/user-role.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class UserRoleRouter {
	constructor(userRoleController) {
		this.userRoleController = userRoleController;
		this.path = "/user-roles";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.userRoleController.getSeveral.bind(this.userRoleController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				user_role_schema_1.userRoleSchema.pick({ id: true })
			),
			this.userRoleController.getOne.bind(this.userRoleController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				user_role_schema_1.userRoleSchema
			),
			this.userRoleController.createOne.bind(this.userRoleController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: user_role_schema_1.userRoleSchema.pick({ id: true }),
				// body: partialUserRoleSchema,
			}),
			this.userRoleController.updateOneById.bind(this.userRoleController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				user_role_schema_1.userRoleSchema.pick({ id: true })
			),
			this.userRoleController.deleteOneById.bind(this.userRoleController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.userRoleController.deleteSeveral.bind(this.userRoleController)
		);
	}
}
exports.UserRoleRouter = UserRoleRouter;
