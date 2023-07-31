"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const inventory_schema_1 = require("../../../domain/inventory.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class InventoryRouter {
	constructor(inventoryController) {
		this.inventoryController = inventoryController;
		this.path = "/inventories";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.inventoryController.getSeveral.bind(this.inventoryController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				inventory_schema_1.inventorySchema.pick({ id: true })
			),
			this.inventoryController.getOne.bind(this.inventoryController)
		);
		this.router.get(
			this.path + "/:id/items",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				inventory_schema_1.inventorySchema.pick({ id: true })
			),
			this.inventoryController.getInventoryItemsById.bind(
				this.inventoryController
			)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				inventory_schema_1.inventorySchema
			),
			this.inventoryController.createOne.bind(this.inventoryController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: inventory_schema_1.inventorySchema.pick({ id: true }),
				body: inventory_schema_1.partialInventorySchema,
			}),
			this.inventoryController.updateOneById.bind(
				this.inventoryController
			)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				inventory_schema_1.inventorySchema.pick({ id: true })
			),
			this.inventoryController.deleteOneById.bind(
				this.inventoryController
			)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.inventoryController.deleteSeveral.bind(
				this.inventoryController
			)
		);
	}
}
exports.InventoryRouter = InventoryRouter;
