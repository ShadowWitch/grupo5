"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialInvoiceSchema = exports.invoiceSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.invoiceSchema = zod_1.z
	.object({
		lote_id: zod_1.z.string(),
		sale_id: zod_1.z.string(),
		status: zod_1.z.string(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialInvoiceSchema = exports.invoiceSchema.partial();
