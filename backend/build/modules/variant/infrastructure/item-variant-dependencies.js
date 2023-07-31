"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const item_variant_services_1 = require("../application/item-variant-services");
const item_variant_controller_1 = require("./http/controllers/item-variant.controller");
const item_variant_routes_1 = require("./http/routes/item-variant.routes");
const prisma_item_variant_repository_1 = require("./persistence/prisma-item-variant-repository");
const itemVariantRepository =
	new prisma_item_variant_repository_1.PrismaItemVariantRepository(
		prisma_1.prisma
	);
const itemVariantServices = new item_variant_services_1.ItemVariantServices(
	itemVariantRepository
);
const itemVariantController =
	new item_variant_controller_1.ItemVariantController(itemVariantServices);
const itemVariantRouter = new item_variant_routes_1.ItemVariantRouter(
	itemVariantController
);
const itemVariantDependencies = {
	controller: itemVariantController,
	services: itemVariantServices,
	repository: itemVariantRepository,
	router: itemVariantRouter,
};
exports.default = itemVariantDependencies;
