"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericSchema = void 0;
const zod_1 = require("zod");
exports.genericSchema = zod_1.z.object({
	id: zod_1.z.string().uuid(),
	created_at: zod_1.z.date().or(zod_1.z.string().datetime()),
	updated_at: zod_1.z.date().or(zod_1.z.string().datetime()),
});
