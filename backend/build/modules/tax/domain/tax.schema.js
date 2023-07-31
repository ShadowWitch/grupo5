"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialTaxSchema = exports.taxSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.taxSchema = zod_1.z
	.object({
		name: zod_1.z.string().min(1).max(255),
		description: zod_1.z.string().min(1).max(255).optional(),
		rate: zod_1.z.number().min(0).nonnegative(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialTaxSchema = exports.taxSchema.partial();
