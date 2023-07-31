"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialInvoiceLoteSchema = exports.invoiceLoteSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.invoiceLoteSchema = zod_1.z
	.object({
		enabled: zod_1.z.boolean(),
		cai: zod_1.z.string().min(1).max(255),
		start_date: zod_1.z.date(),
		end_date: zod_1.z.date(),
		start_range: zod_1.z.string().min(1).max(255),
		end_range: zod_1.z.string().min(1).max(255),
		current: zod_1.z.string().min(1).max(255),
		used: zod_1.z.boolean().optional(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialInvoiceLoteSchema = exports.invoiceLoteSchema.partial();
