"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const provider_schema_1 = require("../../../domain/provider.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class ProviderRouter {
	constructor(providerController) {
		this.providerController = providerController;
		this.path = "/providers";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.providerController.getSeveral.bind(this.providerController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				provider_schema_1.providerSchema.pick({ id: true })
			),
			this.providerController.getOne.bind(this.providerController)
		);
		this.router.get(
			this.path + "/name/:name",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				provider_schema_1.providerSchema.pick({ name: true })
			),
			this.providerController.getOneByName.bind(this.providerController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				provider_schema_1.providerSchema
			),
			this.providerController.createOne.bind(this.providerController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: provider_schema_1.providerSchema.pick({ id: true }),
				body: provider_schema_1.partialProviderSchema,
			}),
			this.providerController.updateOneById.bind(this.providerController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				provider_schema_1.providerSchema.pick({ id: true })
			),
			this.providerController.deleteOneById.bind(this.providerController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.providerController.deleteSeveral.bind(this.providerController)
		);
	}
}
exports.ProviderRouter = ProviderRouter;
