"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const menu_services_1 = require("../application/menu-services");
const menu_controller_1 = require("./http/controllers/menu.controller");
const menu_routes_1 = require("./http/routes/menu.routes");
const prisma_menu_repository_1 = require("./persistence/prisma-menu-repository");
const menuRepository = new prisma_menu_repository_1.PrismaMenuRepository(
	prisma_1.prisma
);
const menuServices = new menu_services_1.MenuServices(menuRepository);
const menuController = new menu_controller_1.MenuController(menuServices);
const menuRouter = new menu_routes_1.MenuRouter(menuController);
const menuDependencies = {
	controller: menuController,
	services: menuServices,
	repository: menuRepository,
	router: menuRouter,
};
exports.default = menuDependencies;
