"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const parameter_services_1 = require("../application/parameter-services");
const parameter_controller_1 = require("./http/controllers/parameter.controller");
const parameter_routes_1 = require("./http/routes/parameter.routes");
const prisma_parameter_repository_1 = require("./persistence/prisma-parameter-repository");
const parameterRepository =
	new prisma_parameter_repository_1.PrismaParameterRepository(
		prisma_1.prisma
	);
const parameterServices = new parameter_services_1.ParameterServices(
	parameterRepository
);
const parameterController = new parameter_controller_1.ParameterController(
	parameterServices
);
const parameterRouter = new parameter_routes_1.ParameterRouter(
	parameterController
);
const parameterDependencies = {
	controller: parameterController,
	services: parameterServices,
	repository: parameterRepository,
	router: parameterRouter,
};
exports.default = parameterDependencies;
