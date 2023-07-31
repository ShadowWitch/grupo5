"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const item_services_1 = require("../application/item-services");
const item_controller_1 = require("./http/controllers/item.controller");
const item_routes_1 = require("./http/routes/item.routes");
const prisma_item_repository_1 = require("./persistence/prisma-item-repository");
const itemRepository = new prisma_item_repository_1.PrismaItemRepository(
	prisma_1.prisma
);
const itemServices = new item_services_1.ItemServices(itemRepository);
const itemController = new item_controller_1.ItemController(itemServices);
const itemRouter = new item_routes_1.ItemRouter(itemController);
const itemDependencies = {
	controller: itemController,
	services: itemServices,
	repository: itemRepository,
	router: itemRouter,
};
exports.default = itemDependencies;
