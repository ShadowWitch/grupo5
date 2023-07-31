"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialSaleSchema =
	exports.saleSchema =
	exports.saleItemsSchema =
		void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.saleItemsSchema = zod_1.z.object({
	item_id: zod_1.z.string().uuid(),
	price: zod_1.z.number().min(0).nonnegative(),
	quantity: zod_1.z.number().min(1).nonnegative(),
	item_modifier_id: zod_1.z.string().uuid().optional(),
	item_variant_id: zod_1.z.string().uuid().optional(),
	discount_id: zod_1.z.string().uuid().optional(),
	note: zod_1.z.string().max(500).optional(),
});
exports.saleSchema = zod_1.z
	.object({
		created_by: zod_1.z.string().uuid().optional(),
		code: zod_1.z.string().min(4).max(10).optional(),
		customer_id: zod_1.z.string().uuid().optional(),
		tax_id: zod_1.z.string().uuid().optional(),
		discount_id: zod_1.z.string().uuid().optional(),
		payment_method: zod_1.z
			.enum(["CASH", "CARD", "TRANSFER", "OTHER"])
			.optional(),
		status: zod_1.z.enum(["PENDING", "PAID", "CANCELLED"]).optional(),
		subtotal: zod_1.z.number().min(0).nonnegative().optional(),
		total: zod_1.z.number().min(0).nonnegative().optional(),
		note: zod_1.z.string().max(500).optional(),
		sale_items: zod_1.z.array(exports.saleItemsSchema).optional(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialSaleSchema = exports.saleSchema.partial();
