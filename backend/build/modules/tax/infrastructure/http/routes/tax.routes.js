"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const tax_schema_1 = require("../../../domain/tax.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class TaxRouter {
	constructor(taxController) {
		this.taxController = taxController;
		this.path = "/taxes";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.taxController.getSeveral.bind(this.taxController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				tax_schema_1.taxSchema.pick({ id: true })
			),
			this.taxController.getOne.bind(this.taxController)
		);
		this.router.get(
			this.path + "/name/:name",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				tax_schema_1.taxSchema.pick({ name: true })
			),
			this.taxController.getOneByName.bind(this.taxController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				tax_schema_1.taxSchema
			),
			this.taxController.createOne.bind(this.taxController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				// params: taxSchema.pick({ id: true }),
				// body: partialDiscountSchema,
			}),
			this.taxController.updateOneById.bind(this.taxController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				tax_schema_1.taxSchema.pick({ id: true })
			),
			this.taxController.deleteOneById.bind(this.taxController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.taxController.deleteSeveral.bind(this.taxController)
		);
	}
}
exports.TaxRouter = TaxRouter;
