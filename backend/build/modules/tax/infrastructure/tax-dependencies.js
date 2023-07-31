"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const tax_services_1 = require("../application/tax-services");
const tax_controller_1 = require("./http/controllers/tax.controller");
const tax_routes_1 = require("./http/routes/tax.routes");
const prisma_tax_repository_1 = require("./persistence/prisma-tax-repository");
const taxRepository = new prisma_tax_repository_1.PrismaTaxRepository(
	prisma_1.prisma
);
const taxServices = new tax_services_1.TaxServices(taxRepository);
const taxController = new tax_controller_1.TaxController(taxServices);
const taxRouter = new tax_routes_1.TaxRouter(taxController);
const taxDependencies = {
	controller: taxController,
	services: taxServices,
	repository: taxRepository,
	router: taxRouter,
};
exports.default = taxDependencies;
