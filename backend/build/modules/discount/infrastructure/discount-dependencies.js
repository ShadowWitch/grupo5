"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const discount_services_1 = require("../application/discount-services");
const discount_controller_1 = require("./http/controllers/discount.controller");
const discount_routes_1 = require("./http/routes/discount.routes");
const prisma_discount_repository_1 = require("./persistence/prisma-discount-repository");
const discountRepository =
	new prisma_discount_repository_1.PrismaDiscountRepository(prisma_1.prisma);
const discountServices = new discount_services_1.DiscountServices(
	discountRepository
);
const discountController = new discount_controller_1.DiscountController(
	discountServices
);
const discountRouter = new discount_routes_1.DiscountRouter(discountController);
const discountDependencies = {
	controller: discountController,
	services: discountServices,
	repository: discountRepository,
	router: discountRouter,
};
exports.default = discountDependencies;
