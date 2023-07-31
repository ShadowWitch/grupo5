"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialJobSchema = exports.jobSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.jobSchema = zod_1.z
	.object({
		name: zod_1.z.string().min(2).max(255),
		description: zod_1.z.string().min(3),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialJobSchema = exports.jobSchema.partial();
