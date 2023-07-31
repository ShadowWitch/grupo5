"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialItemModifierSchema =
	exports.itemModifierSchema =
	exports.itemModifierOptionSchema =
		void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.itemModifierOptionSchema = zod_1.z
	.object({
		name: zod_1.z.string().min(2).max(100),
		price: zod_1.z.coerce.number().min(0).nonnegative(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.itemModifierSchema = zod_1.z
	.object({
		name: zod_1.z.string().min(2).max(100),
		options: zod_1.z.array(exports.itemModifierOptionSchema).nonempty(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialItemModifierSchema = exports.itemModifierSchema.partial();
