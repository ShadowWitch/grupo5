"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const customer_schema_1 = require("../../../domain/customer.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class CustomerRouter {
	constructor(customerController) {
		this.customerController = customerController;
		this.path = "/customers";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.customerController.getSeveral.bind(this.customerController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				customer_schema_1.customerSchema.pick({ id: true })
			),
			this.customerController.getOne.bind(this.customerController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				customer_schema_1.customerSchema
			),
			this.customerController.createOne.bind(this.customerController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: customer_schema_1.customerSchema.pick({ id: true }),
				body: customer_schema_1.partialCustomerSchema,
			}),
			this.customerController.updateOneById.bind(this.customerController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				customer_schema_1.customerSchema.pick({ id: true })
			),
			this.customerController.deleteOneById.bind(this.customerController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.customerController.deleteSeveral.bind(this.customerController)
		);
	}
}
exports.CustomerRouter = CustomerRouter;
