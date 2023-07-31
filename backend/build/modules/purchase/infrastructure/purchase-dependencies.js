"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const purchase_services_1 = require("../application/purchase-services");
const purchase_controller_1 = require("./http/controllers/purchase.controller");
const purchase_routes_1 = require("./http/routes/purchase.routes");
const prisma_purchase_repository_1 = require("./persistence/prisma-purchase-repository");
const purchaseRepository =
	new prisma_purchase_repository_1.PrismaPurchaseRepository(prisma_1.prisma);
const purchaseServices = new purchase_services_1.PurchaseServices(
	purchaseRepository
);
const purchaseController = new purchase_controller_1.PurchaseController(
	purchaseServices
);
const purchaseRouter = new purchase_routes_1.PurchaseRouter(purchaseController);
const purchaseDependencies = {
	controller: purchaseController,
	services: purchaseServices,
	repository: purchaseRepository,
	router: purchaseRouter,
};
exports.default = purchaseDependencies;
