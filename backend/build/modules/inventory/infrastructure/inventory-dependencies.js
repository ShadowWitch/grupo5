"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const inventory_services_1 = require("../application/inventory-services");
const inventory_controller_1 = require("./http/controllers/inventory.controller");
const inventory_routes_1 = require("./http/routes/inventory.routes");
const prisma_inventory_repository_1 = require("./persistence/prisma-inventory-repository");
const inventoryRepository =
	new prisma_inventory_repository_1.PrismaInventoryRepository(
		prisma_1.prisma
	);
const inventoryServices = new inventory_services_1.InventoryServices(
	inventoryRepository
);
const inventoryController = new inventory_controller_1.InventoryController(
	inventoryServices
);
const inventoryRouter = new inventory_routes_1.InventoryRouter(
	inventoryController
);
const inventoryDependencies = {
	controller: inventoryController,
	services: inventoryServices,
	repository: inventoryRepository,
	router: inventoryRouter,
};
exports.default = inventoryDependencies;
