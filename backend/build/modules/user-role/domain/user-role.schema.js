"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialUserRoleSchema = exports.userRoleSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.userRoleSchema = zod_1.z
	.object({
		name: zod_1.z.string().trim(),
		jobs_permission: zod_1.z.boolean().optional(),
		payrolls_permission: zod_1.z.boolean().optional(),
		dashboard_permission: zod_1.z.boolean().optional(),
		categories_permission: zod_1.z.boolean().optional(),
		companies_permission: zod_1.z.boolean().optional(),
		discounts_permission: zod_1.z.boolean().optional(),
		invoices_permission: zod_1.z.boolean().optional(),
		logs_permission: zod_1.z.boolean().optional(),
		menus_permission: zod_1.z.boolean().optional(),
		payments_permission: zod_1.z.boolean().optional(),
		orders_items_permission: zod_1.z.boolean().optional(),
		purchases_permission: zod_1.z.boolean().optional(),
		orders_permission: zod_1.z.boolean().optional(),
		providers_permission: zod_1.z.boolean().optional(),
		taxes_permission: zod_1.z.boolean().optional(),
		transactions_permission: zod_1.z.boolean().optional(),
		description: zod_1.z.string().trim().optional(),
		users_permission: zod_1.z.boolean().optional(),
		user_roles_permission: zod_1.z.boolean().optional(),
		employees_permission: zod_1.z.boolean().optional(),
		customers_permission: zod_1.z.boolean().optional(),
		inventories_permission: zod_1.z.boolean().optional(),
		items_permission: zod_1.z.boolean().optional(),
		sales_permission: zod_1.z.boolean().optional(),
		terminals_permission: zod_1.z.boolean().optional(),
		items_modifiers_permission: zod_1.z.boolean().optional(),
		items_variations_permission: zod_1.z.boolean().optional(),
		pos_permission: zod_1.z.boolean().optional(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialUserRoleSchema = exports.userRoleSchema.partial();
