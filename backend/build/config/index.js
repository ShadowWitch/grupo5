"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectConfig = void 0;
const env_1 = require("./env");
const projectConfig = {
	database: {
		type: "postgres",
		stringConnection: env_1.env.DB_POSTGRES_URL,
		host: env_1.env.DB_POSTGRES_HOST,
		password: env_1.env.DB_POSTGRES_PASSWORD,
		user: env_1.env.DB_POSTGRES_USER,
		defaultSchema: env_1.env.DB_POSTGRES_DEFAULT_SCHEMA,
	},
	documentationUrl: env_1.env.DOCUMENTATION_URL,
	token: {
		secret: env_1.env.TOKEN_SECRET,
	},
	server: {
		port: env_1.env.SERVER_PORT,
		enviroment: env_1.env.NODE_ENV,
		publicURL: env_1.env.API_PUBLIC_URL,
	},
	client: {
		publicURL: env_1.env.CLIENT_PUBLIC_URL,
	},
};
exports.projectConfig = projectConfig;
