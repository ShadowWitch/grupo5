"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const company_schema_1 = require("../../../domain/company.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class CompanyRouter {
	constructor(companyController) {
		this.companyController = companyController;
		this.path = "/companies";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.companyController.getSeveral.bind(this.companyController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				company_schema_1.companySchema.pick({ id: true })
			),
			this.companyController.getOne.bind(this.companyController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				company_schema_1.companySchema
			),
			this.companyController.createOne.bind(this.companyController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: company_schema_1.companySchema.pick({ id: true }),
				body: company_schema_1.partialCompanySchema,
			}),
			this.companyController.updateOneById.bind(this.companyController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				company_schema_1.companySchema.pick({ id: true })
			),
			this.companyController.deleteOneById.bind(this.companyController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.companyController.deleteSeveral.bind(this.companyController)
		);
	}
}
exports.CompanyRouter = CompanyRouter;
