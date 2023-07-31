"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialDiscountSchema = exports.discountSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.discountSchema = zod_1.z
	.object({
		name: zod_1.z.string().min(1).max(255),
		amount: zod_1.z.number().min(0),
		note: zod_1.z.string().min(1).max(255).optional(),
		amount_type: zod_1.z.enum(["PERCENTAGE", "FIXED"]),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialDiscountSchema = exports.discountSchema.partial();
