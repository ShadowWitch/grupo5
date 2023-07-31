"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const invoice_schema_1 = require("../../../domain/invoice.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class InvoiceRouter {
	constructor(invoiceController) {
		this.invoiceController = invoiceController;
		this.path = "/invoices";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.invoiceController.getSeveral.bind(this.invoiceController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				invoice_schema_1.invoiceSchema.pick({ id: true })
			),
			this.invoiceController.getOne.bind(this.invoiceController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				invoice_schema_1.invoiceSchema
			),
			this.invoiceController.createOne.bind(this.invoiceController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				// params: taxSchema.pick({ id: true }),
				// body: partialDiscountSchema,
			}),
			this.invoiceController.updateOneById.bind(this.invoiceController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				invoice_schema_1.invoiceSchema.pick({ id: true })
			),
			this.invoiceController.deleteOneById.bind(this.invoiceController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.invoiceController.deleteSeveral.bind(this.invoiceController)
		);
	}
}
exports.InvoiceRouter = InvoiceRouter;
