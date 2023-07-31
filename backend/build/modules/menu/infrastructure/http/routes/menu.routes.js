"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const menu_schema_1 = require("../../../domain/menu.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class MenuRouter {
	constructor(menuController) {
		this.menuController = menuController;
		this.path = "/menus";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.menuController.getSeveral.bind(this.menuController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				menu_schema_1.menuSchema.pick({ id: true })
			),
			this.menuController.getOne.bind(this.menuController)
		);
		this.router.get(
			this.path + "/name/:name",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				menu_schema_1.menuSchema.pick({ name: true })
			),
			this.menuController.getOneByName.bind(this.menuController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				menu_schema_1.menuSchema
			),
			this.menuController.createOne.bind(this.menuController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: menu_schema_1.menuSchema.pick({ id: true }),
				body: menu_schema_1.partialMenuSchema,
			}),
			this.menuController.updateOneById.bind(this.menuController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				menu_schema_1.menuSchema.pick({ id: true })
			),
			this.menuController.deleteOneById.bind(this.menuController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.menuController.deleteSeveral.bind(this.menuController)
		);
	}
}
exports.MenuRouter = MenuRouter;
