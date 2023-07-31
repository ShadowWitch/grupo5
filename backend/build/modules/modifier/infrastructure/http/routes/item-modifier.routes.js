"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModifierRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const item_modifier_schema_1 = require("../../../domain/item-modifier.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class ItemModifierRouter {
	constructor(itemModifierController) {
		this.itemModifierController = itemModifierController;
		this.path = "/modifiers";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.itemModifierController.getSeveral.bind(
				this.itemModifierController
			)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				item_modifier_schema_1.itemModifierSchema.pick({ id: true })
			),
			this.itemModifierController.getOne.bind(this.itemModifierController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				item_modifier_schema_1.itemModifierSchema
			),
			this.itemModifierController.createOne.bind(
				this.itemModifierController
			)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: item_modifier_schema_1.itemModifierSchema.pick({
					id: true,
				}),
				body: item_modifier_schema_1.partialItemModifierSchema,
			}),
			this.itemModifierController.updateOneById.bind(
				this.itemModifierController
			)
		);
		this.router.put(
			this.path + "/:id/options",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				item_modifier_schema_1.itemModifierSchema.pick({ id: true })
			),
			(0, zod_express_middleware_1.validateRequestBody)(
				item_modifier_schema_1.itemModifierSchema.pick({
					options: true,
				})
			),
			this.itemModifierController.updateOptions.bind(
				this.itemModifierController
			)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				item_modifier_schema_1.itemModifierSchema.pick({ id: true })
			),
			this.itemModifierController.deleteOneById.bind(
				this.itemModifierController
			)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.itemModifierController.deleteSeveral.bind(
				this.itemModifierController
			)
		);
	}
}
exports.ItemModifierRouter = ItemModifierRouter;
