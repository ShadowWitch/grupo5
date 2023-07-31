"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const discount_schema_1 = require("../../../domain/discount.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class DiscountRouter {
	constructor(discountController) {
		this.discountController = discountController;
		this.path = "/discounts";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.discountController.getSeveral.bind(this.discountController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				discount_schema_1.discountSchema.pick({ id: true })
			),
			this.discountController.getOne.bind(this.discountController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				discount_schema_1.discountSchema
			),
			this.discountController.createOne.bind(this.discountController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: discount_schema_1.discountSchema.pick({ id: true }),
				body: discount_schema_1.partialDiscountSchema,
			}),
			this.discountController.updateOneById.bind(this.discountController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				discount_schema_1.discountSchema.pick({ id: true })
			),
			this.discountController.deleteOneById.bind(this.discountController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.discountController.deleteSeveral.bind(this.discountController)
		);
	}
}
exports.DiscountRouter = DiscountRouter;
