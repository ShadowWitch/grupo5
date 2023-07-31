"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialProviderSchema = exports.providerSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.providerSchema = zod_1.z
	.object({
		enabled: zod_1.z.boolean().optional(),
		name: zod_1.z.string().min(2).max(255),
		email: zod_1.z.string().email().optional().nullable(),
		bussiness_id: zod_1.z.string().min(1).max(255).optional(),
		emails: zod_1.z.array(zod_1.z.string().email()).optional(),
		phones: zod_1.z.array(zod_1.z.string().min(8).max(14)).optional(),
		country: zod_1.z.string().min(2).max(100),
		state: zod_1.z.string().min(2).max(100),
		city: zod_1.z.string().min(2).max(100),
		street: zod_1.z.string().min(2).max(100),
		website_url: zod_1.z.string().url().optional().nullable(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialProviderSchema = exports.providerSchema.partial();
