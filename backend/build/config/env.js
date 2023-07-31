"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const env_core_1 = require("@t3-oss/env-core");
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)();
exports.env = (0, env_core_1.createEnv)({
	clientPrefix: "PUBLIC_",
	server: {
		SERVER_PORT: zod_1.z
			.string()
			.transform((arg) => Number(arg))
			.optional(),
		NODE_ENV: zod_1.z.string().default("development"),
		DB_POSTGRES_URL: zod_1.z.string().url(),
		DB_POSTGRES_HOST: zod_1.z.string(),
		DB_POSTGRES_DEFAULT_SCHEMA: zod_1.z.string(),
		DB_POSTGRES_USER: zod_1.z.string().min(1),
		DB_POSTGRES_PASSWORD: zod_1.z.string(),
		DB_POSTGRES_PORT: zod_1.z.string().transform((arg) => Array(arg)),
		API_PUBLIC_URL: zod_1.z.string().url(),
		TOKEN_SECRET: zod_1.z.string(),
		DOCUMENTATION_URL: zod_1.z.string().url(),
		GOOGLE_GMAIL_PASSWORD: zod_1.z.string(),
		TOKEN_EXPIRES_IN: zod_1.z.string(),
		CLIENT_PUBLIC_URL: zod_1.z.string().default("http://localhost:3001"),
		CACHE_REDIS_URL: zod_1.z.string(),
		CACHE_REDIS_PORT: zod_1.z.string().transform((arg) => Number(arg)),
		CACHE_REDIS_PASSWORD: zod_1.z.string(),
		EMAIL_FROM_NAME_NO_REPLY: zod_1.z.string(),
		EMAIL_FROM_ADDRESS_NO_REPLY: zod_1.z.string().email(),
		MAILTRAP_HOST: zod_1.z.string(),
		MAILTRAP_PORT: zod_1.z.string().transform((arg) => Number(arg)),
		MAILTRAP_USER: zod_1.z.string(),
		MAILTRAP_PASSWORD: zod_1.z.string(),
	},
	client: {},
	runtimeEnv: process.env,
});
