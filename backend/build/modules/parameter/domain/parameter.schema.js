"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialParameterSchema = exports.parameterSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.parameterSchema = zod_1.z
	.object({
		enabled: zod_1.z.boolean().optional(),
		code: zod_1.z.string().min(1).max(255),
		name: zod_1.z.string().min(1).max(255),
		description: zod_1.z.string().min(1),
		value: zod_1.z.string().min(1).max(500),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialParameterSchema = exports.parameterSchema.partial();
