"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const invoice_lote_services_1 = require("../application/invoice-lote-services");
const invoice_lote_controller_1 = require("./http/controllers/invoice-lote.controller");
const invoice_lote_routes_1 = require("./http/routes/invoice-lote.routes");
const prisma_invoice_lote_repository_1 = require("./persistence/prisma-invoice-lote-repository");
const invoiceLoteRepository =
	new prisma_invoice_lote_repository_1.PrismaInvoiceLoteRepository(
		prisma_1.prisma
	);
const invoiceLoteServices = new invoice_lote_services_1.InvoiceServices(
	invoiceLoteRepository
);
const invoiceLoteController =
	new invoice_lote_controller_1.InvoiceLoteController(invoiceLoteServices);
const invoiceLoteRouter = new invoice_lote_routes_1.InvoiceLoteRouter(
	invoiceLoteController
);
const invoiceLoteDependencies = {
	controller: invoiceLoteController,
	services: invoiceLoteServices,
	repository: invoiceLoteRepository,
	router: invoiceLoteRouter,
};
exports.default = invoiceLoteDependencies;
