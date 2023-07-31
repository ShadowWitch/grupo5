"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const invoice_services_1 = require("../application/invoice-services");
const invoice_controller_1 = require("./http/controllers/invoice.controller");
const invoice_routes_1 = require("./http/routes/invoice.routes");
const prisma_invoice_repository_1 = require("./persistence/prisma-invoice-repository");
const invoiceRepository =
	new prisma_invoice_repository_1.PrismaInvoiceRepository(prisma_1.prisma);
const invoiceServices = new invoice_services_1.InvoiceServices(
	invoiceRepository
);
const invoiceController = new invoice_controller_1.InvoiceController(
	invoiceServices
);
const invoiceRouter = new invoice_routes_1.InvoiceRouter(invoiceController);
const invoiceDependencies = {
	controller: invoiceController,
	services: invoiceServices,
	repository: invoiceRepository,
	router: invoiceRouter,
};
exports.default = invoiceDependencies;
