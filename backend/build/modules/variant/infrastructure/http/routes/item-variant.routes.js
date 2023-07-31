"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemVariantRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const item_variant_schema_1 = require("../../../domain/item-variant.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class ItemVariantRouter {
	constructor(itemVariantController) {
		this.itemVariantController = itemVariantController;
		this.path = "/variants";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.itemVariantController.getSeveral.bind(
				this.itemVariantController
			)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				item_variant_schema_1.itemVariantSchema.pick({ id: true })
			),
			this.itemVariantController.getOne.bind(this.itemVariantController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				item_variant_schema_1.itemVariantSchema
			),
			this.itemVariantController.createOne.bind(
				this.itemVariantController
			)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: item_variant_schema_1.itemVariantSchema.pick({
					id: true,
				}),
				body: item_variant_schema_1.partialItemVariantSchema,
			}),
			this.itemVariantController.updateOneById.bind(
				this.itemVariantController
			)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				item_variant_schema_1.itemVariantSchema.pick({ id: true })
			),
			this.itemVariantController.deleteOneById.bind(
				this.itemVariantController
			)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.itemVariantController.deleteSeveral.bind(
				this.itemVariantController
			)
		);
	}
}
exports.ItemVariantRouter = ItemVariantRouter;
