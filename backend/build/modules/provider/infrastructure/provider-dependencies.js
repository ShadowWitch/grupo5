"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const provider_services_1 = require("../application/provider-services");
const provider_controller_1 = require("./http/controllers/provider.controller");
const provider_routes_1 = require("./http/routes/provider.routes");
const prisma_provider_repository_1 = require("./persistence/prisma-provider-repository");
const providerRepository =
	new prisma_provider_repository_1.PrismaProviderRepository(prisma_1.prisma);
const providerServices = new provider_services_1.ProviderServices(
	providerRepository
);
const providerController = new provider_controller_1.ProviderController(
	providerServices
);
const providerRouter = new provider_routes_1.ProviderRouter(providerController);
const providerDependencies = {
	controller: providerController,
	services: providerServices,
	repository: providerRepository,
	router: providerRouter,
};
exports.default = providerDependencies;
