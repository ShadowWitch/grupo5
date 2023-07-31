"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialCategorySchema = exports.categorySchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.categorySchema = zod_1.z
	.object({
		name: zod_1.z.string().min(1).max(255),
		description: zod_1.z.string().min(1).max(255).optional(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialCategorySchema = exports.categorySchema.partial();
