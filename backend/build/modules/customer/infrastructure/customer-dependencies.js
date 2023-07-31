"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const customer_services_1 = require("../application/customer-services");
const customer_controller_1 = require("./http/controllers/customer.controller");
const customer_routes_1 = require("./http/routes/customer.routes");
const prisma_customer_repository_1 = require("./persistence/prisma-customer-repository");
const customerRepository =
	new prisma_customer_repository_1.PrismaCustomerRepository(prisma_1.prisma);
const customerServices = new customer_services_1.CustomerServices(
	customerRepository
);
const customerController = new customer_controller_1.CustomerController(
	customerServices
);
const customerRouter = new customer_routes_1.CustomerRouter(customerController);
const customerDependencies = {
	controller: customerController,
	services: customerServices,
	repository: customerRepository,
	router: customerRouter,
};
exports.default = customerDependencies;
