"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const purchase_schema_1 = require("../../../domain/purchase.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class PurchaseRouter {
	constructor(purchaseController) {
		this.purchaseController = purchaseController;
		this.path = "/purchases";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.purchaseController.getSeveral.bind(this.purchaseController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				purchase_schema_1.purchaseSchema.pick({ id: true })
			),
			this.purchaseController.getOne.bind(this.purchaseController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				purchase_schema_1.purchaseSchema
			),
			this.purchaseController.createOne.bind(this.purchaseController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: purchase_schema_1.purchaseSchema.pick({ id: true }),
				body: purchase_schema_1.partialPurchaseSchema,
			}),
			this.purchaseController.updateOneById.bind(this.purchaseController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				purchase_schema_1.purchaseSchema.pick({ id: true })
			),
			this.purchaseController.deleteOneById.bind(this.purchaseController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.purchaseController.deleteSeveral.bind(this.purchaseController)
		);
	}
}
exports.PurchaseRouter = PurchaseRouter;
