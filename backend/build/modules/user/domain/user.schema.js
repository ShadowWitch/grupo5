"use strict";
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (
					!desc ||
					("get" in desc
						? !m.__esModule
						: desc.writable || desc.configurable)
				) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k];
						},
					};
				}
				Object.defineProperty(o, k2, desc);
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v,
				});
		  }
		: function (o, v) {
				o["default"] = v;
		  });
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (
					k !== "default" &&
					Object.prototype.hasOwnProperty.call(mod, k)
				)
					__createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.partialUserSchema = exports.userSchema = void 0;
const z = __importStar(require("zod"));
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.userSchema = z
	.object({
		enabled: z.boolean().optional(),
		username: z.string().trim().min(2).max(50),
		email: z.string().trim().email(),
		password: z.string().min(8).max(50),
		employee_id: z.string().uuid(),
		// user_role_id: z.string().uuid(),
		verified: z.boolean().optional(),
	})
	.merge(generic_schema_1.genericSchema.partial());
exports.partialUserSchema = exports.userSchema.partial();
exports.signInSchema = z.object({
	identifier: z.string().nonempty(),
	password: z.string().nonempty(),
});
