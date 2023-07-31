"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceLoteRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const invoice_lote_schema_1 = require("../../../domain/invoice-lote.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class InvoiceLoteRouter {
	constructor(invoiceLoteController) {
		this.invoiceLoteController = invoiceLoteController;
		this.path = "/invoice-lotes";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.invoiceLoteController.getSeveral.bind(
				this.invoiceLoteController
			)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				invoice_lote_schema_1.invoiceLoteSchema.pick({ id: true })
			),
			this.invoiceLoteController.getOne.bind(this.invoiceLoteController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				invoice_lote_schema_1.invoiceLoteSchema
			),
			this.invoiceLoteController.createOne.bind(
				this.invoiceLoteController
			)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				// params: taxSchema.pick({ id: true }),
				// body: partialDiscountSchema,
			}),
			this.invoiceLoteController.updateOneById.bind(
				this.invoiceLoteController
			)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				invoice_lote_schema_1.invoiceLoteSchema.pick({ id: true })
			),
			this.invoiceLoteController.deleteOneById.bind(
				this.invoiceLoteController
			)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.invoiceLoteController.deleteSeveral.bind(
				this.invoiceLoteController
			)
		);
	}
}
exports.InvoiceLoteRouter = InvoiceLoteRouter;
