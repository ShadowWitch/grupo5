"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const parameter_schema_1 = require("../../../domain/parameter.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class ParameterRouter {
	constructor(parametersController) {
		this.parametersController = parametersController;
		this.path = "/parameters";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.parametersController.getSeveral.bind(this.parametersController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				parameter_schema_1.parameterSchema.pick({ id: true })
			),
			this.parametersController.getOne.bind(this.parametersController)
		);
		this.router.get(
			this.path + "/name/:name",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				parameter_schema_1.parameterSchema.pick({ name: true })
			),
			this.parametersController.getOneByName.bind(
				this.parametersController
			)
		);
		this.router.get(
			this.path + "/value/:value",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				parameter_schema_1.parameterSchema.pick({ value: true })
			),
			this.parametersController.getOneByValue.bind(
				this.parametersController
			)
		);
		this.router.post(
			this.path,
			// validateRequestBody(parameterSchema),
			this.parametersController.createOne.bind(this.parametersController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				// params: taxSchema.pick({ id: true }),
				// body: partialDiscountSchema,
			}),
			this.parametersController.updateOneById.bind(
				this.parametersController
			)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				parameter_schema_1.parameterSchema.pick({ id: true })
			),
			this.parametersController.deleteOneById.bind(
				this.parametersController
			)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.parametersController.deleteSeveral.bind(
				this.parametersController
			)
		);
	}
}
exports.ParameterRouter = ParameterRouter;
