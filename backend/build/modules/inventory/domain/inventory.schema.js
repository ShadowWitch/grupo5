"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialInventorySchema = exports.inventorySchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.inventorySchema = zod_1.z
	.object({
		name: zod_1.z.string().min(3).max(255),
		description: zod_1.z.string().min(3).max(255).optional(),
		company_id: zod_1.z.string().uuid(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialInventorySchema = exports.inventorySchema.partial();
