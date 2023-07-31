"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const auth_dependencies_1 = __importDefault(
	require("./modules/auth/infrastructure/auth-dependencies")
);
const user_dependencies_1 = __importDefault(
	require("./modules/user/infrastructure/user-dependencies")
);
const company_dependencies_1 = __importDefault(
	require("./modules/company/infrastructure/company-dependencies")
);
const customer_dependencies_1 = __importDefault(
	require("./modules/customer/infrastructure/customer-dependencies")
);
const employee_dependencies_1 = __importDefault(
	require("./modules/employee/infrastructure/employee-dependencies")
);
const user_role_dependencies_1 = __importDefault(
	require("./modules/user-role/infrastructure/user-role-dependencies")
);
const item_dependencies_1 = __importDefault(
	require("./modules/item/infrastructure/item-dependencies")
);
const sale_dependencies_1 = __importDefault(
	require("./modules/sale/infrastructure/sale-dependencies")
);
const inventory_dependencies_1 = __importDefault(
	require("./modules/inventory/infrastructure/inventory-dependencies")
);
const company_dependencies_2 = __importDefault(
	require("./modules/company/infrastructure/company-dependencies")
);
const discount_dependencies_1 = __importDefault(
	require("./modules/discount/infrastructure/discount-dependencies")
);
const tax_dependencies_1 = __importDefault(
	require("./modules/tax/infrastructure/tax-dependencies")
);
const provider_dependencies_1 = __importDefault(
	require("./modules/provider/infrastructure/provider-dependencies")
);
const menu_dependencies_1 = __importDefault(
	require("./modules/menu/infrastructure/menu-dependencies")
);
const job_dependencies_1 = __importDefault(
	require("./modules/job/infrastructure/job-dependencies")
);
const category_dependencies_1 = __importDefault(
	require("./modules/category/infrastructure/category-dependencies")
);
const item_modifier_dependencies_1 = __importDefault(
	require("./modules/modifier/infrastructure/item-modifier-dependencies")
);
const item_variant_dependencies_1 = __importDefault(
	require("./modules/variant/infrastructure/item-variant-dependencies")
);
const invoice_dependencies_1 = __importDefault(
	require("./modules/invoice/infrastructure/invoice-dependencies")
);
const invoice_lote_dependencies_1 = __importDefault(
	require("./modules/invoice-lote/infrastructure/invoice-lote-dependencies")
);
const purchase_dependencies_1 = __importDefault(
	require("./modules/purchase/infrastructure/purchase-dependencies")
);
const backup_dependencies_1 = __importDefault(
	require("./modules/backup/infrastructure/backup-dependencies")
);
const parameter_dependencies_1 = __importDefault(
	require("./modules/parameter/infrastructure/parameter-dependencies")
);
exports.default = new server_1.Server({
	routes: [
		backup_dependencies_1.default.router,
		parameter_dependencies_1.default.router,
		user_dependencies_1.default.router,
		auth_dependencies_1.default.router,
		company_dependencies_1.default.router,
		employee_dependencies_1.default.router,
		customer_dependencies_1.default.router,
		user_role_dependencies_1.default.router,
		sale_dependencies_1.default.router,
		purchase_dependencies_1.default.router,
		inventory_dependencies_1.default.router,
		item_dependencies_1.default.router,
		category_dependencies_1.default.router,
		item_variant_dependencies_1.default.router,
		item_modifier_dependencies_1.default.router,
		menu_dependencies_1.default.router,
		company_dependencies_2.default.router,
		discount_dependencies_1.default.router,
		tax_dependencies_1.default.router,
		provider_dependencies_1.default.router,
		job_dependencies_1.default.router,
		invoice_dependencies_1.default.router,
		invoice_lote_dependencies_1.default.router,
	],
	middlewares: [],
});
