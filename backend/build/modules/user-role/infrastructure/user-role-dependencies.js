"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const user_role_services_1 = require("../application/user-role-services");
const user_role_controller_1 = require("./http/controllers/user-role.controller");
const user_role_routes_1 = require("./http/routes/user-role.routes");
const prisma_user_role_repository_1 = require("./persistence/prisma-user-role-repository");
const userRoleRepository =
	new prisma_user_role_repository_1.PrismaUserRoleRepository(prisma_1.prisma);
const userRoleServices = new user_role_services_1.UserRoleServices(
	userRoleRepository
);
const userRoleController = new user_role_controller_1.UserRoleController(
	userRoleServices
);
const userRoleRouter = new user_role_routes_1.UserRoleRouter(
	userRoleController
);
const userRoleDependencies = {
	controller: userRoleController,
	services: userRoleServices,
	repository: userRoleRepository,
	router: userRoleRouter,
};
exports.default = userRoleDependencies;
