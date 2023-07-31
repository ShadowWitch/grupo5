"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialItemSchema = exports.itemSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.itemSchema = zod_1.z
	.object({
		created_by: zod_1.z.string().optional(),
		enabled: zod_1.z.boolean().optional(),
		name: zod_1.z.string().min(2).max(100),
		description: zod_1.z.string().optional(),
		price: zod_1.z.number().min(0),
		quantity: zod_1.z.number().min(0).nonnegative(),
		category_id: zod_1.z.string().uuid().optional(),
		images: zod_1.z.array(zod_1.z.string().url()).optional(),
		tax_id: zod_1.z.string().uuid().optional(),
		provider_id: zod_1.z.string().uuid().optional(),
		inventory_id: zod_1.z.string().uuid(),
		menu_id: zod_1.z.string().uuid().optional(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialItemSchema = exports.itemSchema.partial();
