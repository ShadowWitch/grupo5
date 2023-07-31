"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const category_services_1 = require("../application/category-services");
const category_controller_1 = require("./http/controllers/category.controller");
const category_routes_1 = require("./http/routes/category.routes");
const prisma_category_repository_1 = require("./persistence/prisma-category-repository");
const categoryRepository =
	new prisma_category_repository_1.PrismaCategoryRepository(prisma_1.prisma);
const categoryServices = new category_services_1.CategoryServices(
	categoryRepository
);
const categoryController = new category_controller_1.CategoryController(
	categoryServices
);
const categoryRouter = new category_routes_1.CategoryRouter(categoryController);
const categoryDependencies = {
	controller: categoryController,
	services: categoryServices,
	repository: categoryRepository,
	router: categoryRouter,
};
exports.default = categoryDependencies;
