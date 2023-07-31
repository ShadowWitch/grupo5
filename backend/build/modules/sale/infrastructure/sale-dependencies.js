"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const sale_services_1 = require("../application/sale-services");
const sale_controller_1 = require("./http/controllers/sale.controller");
const sale_routes_1 = require("./http/routes/sale.routes");
const prisma_sale_repository_1 = require("./persistence/prisma-sale-repository");
const saleRepository = new prisma_sale_repository_1.PrismaSaleRepository(
	prisma_1.prisma
);
const saleServices = new sale_services_1.SaleServices(saleRepository);
const saleController = new sale_controller_1.SaleController(saleServices);
const saleRouter = new sale_routes_1.SaleRouter(saleController);
const saleDependencies = {
	controller: saleController,
	services: saleServices,
	repository: saleRepository,
	router: saleRouter,
};
exports.default = saleDependencies;
