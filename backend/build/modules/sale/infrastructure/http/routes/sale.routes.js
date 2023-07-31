"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const sale_schema_1 = require("../../../domain/sale.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class SaleRouter {
	constructor(saleController) {
		this.saleController = saleController;
		this.path = "/sales";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.saleController.getSeveral.bind(this.saleController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				sale_schema_1.saleSchema.pick({ id: true })
			),
			this.saleController.getOne.bind(this.saleController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				sale_schema_1.saleSchema
			),
			this.saleController.createOne.bind(this.saleController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: sale_schema_1.saleSchema.pick({ id: true }),
				body: sale_schema_1.partialSaleSchema,
			}),
			this.saleController.updateOneById.bind(this.saleController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				sale_schema_1.saleSchema.pick({ id: true })
			),
			this.saleController.deleteOneById.bind(this.saleController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.saleController.deleteSeveral.bind(this.saleController)
		);
	}
}
exports.SaleRouter = SaleRouter;
