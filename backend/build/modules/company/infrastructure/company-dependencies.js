"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const company_services_1 = require("../application/company-services");
const company_controller_1 = require("./http/controllers/company.controller");
const company_routes_1 = require("./http/routes/company.routes");
const prisma_company_repository_1 = require("./persistence/prisma-company-repository");
const companyRepository =
	new prisma_company_repository_1.PrismaCompanyRepository(prisma_1.prisma);
const companyServices = new company_services_1.CompanyServices(
	companyRepository
);
const companyController = new company_controller_1.CompanyController(
	companyServices
);
const companyRouter = new company_routes_1.CompanyRouter(companyController);
const companyDependencies = {
	controller: companyController,
	services: companyServices,
	repository: companyRepository,
	router: companyRouter,
};
exports.default = companyDependencies;
