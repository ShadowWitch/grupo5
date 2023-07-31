"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const item_schema_1 = require("../../../domain/item.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class ItemRouter {
	constructor(itemController) {
		this.itemController = itemController;
		this.path = "/items";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.itemController.getSeveral.bind(this.itemController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				item_schema_1.itemSchema.pick({ id: true })
			),
			this.itemController.getOne.bind(this.itemController)
		);
		this.router.post(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestBody)(
				item_schema_1.itemSchema
			),
			this.itemController.createOne.bind(this.itemController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: item_schema_1.itemSchema.pick({ id: true }),
				body: item_schema_1.partialItemSchema,
			}),
			this.itemController.updateOneById.bind(this.itemController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				item_schema_1.itemSchema.pick({ id: true })
			),
			this.itemController.deleteOneById.bind(this.itemController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.itemController.deleteSeveral.bind(this.itemController)
		);
	}
}
exports.ItemRouter = ItemRouter;
