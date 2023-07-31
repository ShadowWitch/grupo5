"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const employee_schema_1 = require("../../../domain/employee.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class EmployeeRouter {
	constructor(employeeController) {
		this.employeeController = employeeController;
		this.path = "/employees";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.employeeController.getSeveral.bind(this.employeeController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				employee_schema_1.employeeSchema.pick({ id: true })
			),
			this.employeeController.getOne.bind(this.employeeController)
		);
		this.router.post(
			this.path,
			// validateRequestBody(employeeSchema),
			this.employeeController.createOne.bind(this.employeeController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: employee_schema_1.employeeSchema.pick({ id: true }),
				// body: employeeSchema,
			}),
			this.employeeController.updateOneById.bind(this.employeeController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				employee_schema_1.employeeSchema.pick({ id: true })
			),
			this.employeeController.deleteOneById.bind(this.employeeController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.employeeController.deleteSeveral.bind(this.employeeController)
		);
	}
}
exports.EmployeeRouter = EmployeeRouter;
