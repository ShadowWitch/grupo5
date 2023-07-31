"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const category_schema_1 = require("../../../domain/category.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class CategoryRouter {
	constructor(categoryController) {
		this.categoryController = categoryController;
		this.path = "/categories";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.categoryController.getSeveral.bind(this.categoryController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				category_schema_1.categorySchema.pick({ id: true })
			),
			this.categoryController.getOne.bind(this.categoryController)
		);
		this.router.get(
			this.path + "/name/:name",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				category_schema_1.categorySchema.pick({ name: true })
			),
			this.categoryController.getOneByName.bind(this.categoryController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				category_schema_1.categorySchema
			),
			this.categoryController.createOne.bind(this.categoryController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: category_schema_1.categorySchema.pick({ id: true }),
				body: category_schema_1.partialCategorySchema,
			}),
			this.categoryController.updateOneById.bind(this.categoryController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				category_schema_1.categorySchema.pick({ id: true })
			),
			this.categoryController.deleteOneById.bind(this.categoryController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.categoryController.deleteSeveral.bind(this.categoryController)
		);
	}
}
exports.CategoryRouter = CategoryRouter;
