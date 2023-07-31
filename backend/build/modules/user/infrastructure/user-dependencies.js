"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../config");
const prisma_1 = require("../../../config/prisma");
const dependecies_1 = require("../../../shared/infrastructure/dependecies");
const user_services_1 = require("../application/user-services");
const user_controller_1 = require("./http/controllers/user.controller");
const user_routes_1 = require("./http/routes/user.routes");
const prisma_user_repository_1 = require("./persistence/prisma-user-repository");
const userRepository = (() => {
	switch (config_1.projectConfig.database.type) {
		case "postgres":
			return new prisma_user_repository_1.PrismaUserRepository(
				prisma_1.prisma
			);
		case "mysql":
			return new prisma_user_repository_1.PrismaUserRepository(
				prisma_1.prisma
			);
		default:
			throw new Error("Database not supported");
	}
})();
const userServices = new user_services_1.UserServices(
	userRepository,
	dependecies_1.emailSender
);
const userController = new user_controller_1.UserController(userServices);
const userRouter = new user_routes_1.UserRouter(userController);
const userDependencies = {
	controller: userController,
	services: userServices,
	repository: userRepository,
	router: userRouter,
};
exports.default = userDependencies;
// https://github.com/AlbertHernandez/repository-pattern-typescript-example/blob/main/src/users/infrastructure/dependencies.ts
