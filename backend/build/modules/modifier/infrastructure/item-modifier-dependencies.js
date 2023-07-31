"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const item_modifier_services_1 = require("../application/item-modifier-services");
const item_modifier_controller_1 = require("./http/controllers/item-modifier.controller");
const item_modifier_routes_1 = require("./http/routes/item-modifier.routes");
const prisma_item_modifier_repository_1 = require("./persistence/prisma-item-modifier-repository");
const itemModifierRepository =
	new prisma_item_modifier_repository_1.PrismaItemModifierRepository(
		prisma_1.prisma
	);
const itemModifierServices = new item_modifier_services_1.ItemModifierServices(
	itemModifierRepository
);
const itemModifierController =
	new item_modifier_controller_1.ItemModifierController(itemModifierServices);
const itemModifierRouter = new item_modifier_routes_1.ItemModifierRouter(
	itemModifierController
);
const itemModifierDependencies = {
	controller: itemModifierController,
	services: itemModifierServices,
	repository: itemModifierRepository,
	router: itemModifierRouter,
};
exports.default = itemModifierDependencies;
