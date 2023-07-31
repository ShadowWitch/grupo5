"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialPurchaseSchema =
	exports.purchaseSchema =
	exports.purchaseItemsSchema =
		void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.purchaseItemsSchema = zod_1.z.object({
	item_id: zod_1.z.string().uuid(),
	price: zod_1.z.number().min(0).nonnegative(),
	note: zod_1.z.string().max(500).optional(),
	quantity: zod_1.z.number().min(1).nonnegative(),
	total: zod_1.z.number().min(0).nonnegative(),
});
exports.purchaseSchema = zod_1.z
	.object({
		created_by: zod_1.z.string().uuid().optional(),
		code: zod_1.z.string().min(4).max(10).optional(),
		provider_id: zod_1.z.string().uuid().optional(),
		tax_id: zod_1.z.string().uuid().optional(),
		expected_date: zod_1.z
			.date()
			.min(new Date("2000-12-12"))
			.max(new Date()),
		payment_method: zod_1.z
			.enum(["CASH", "CARD", "TRANSFER", "OTHER"])
			.optional(),
		status: zod_1.z.enum(["PENDING", "PAID", "CANCELLED"]).optional(),
		subtotal: zod_1.z.number().min(0).nonnegative().optional(),
		total: zod_1.z.number().min(0).nonnegative().optional(),
		note: zod_1.z.string().max(500).optional(),
		purchase_items: zod_1.z.any(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialPurchaseSchema = exports.purchaseSchema.partial();
