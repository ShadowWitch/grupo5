"use strict";
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step(
				(generator = generator.apply(thisArg, _arguments || [])).next()
			);
		});
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const response_time_1 = __importDefault(require("response-time"));
const correlation_id_middleware_1 = require("./middlewares/correlation-id.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const config_1 = require("./config");
class Server {
	constructor(appInit) {
		this.app = (0, express_1.default)();
		this.port = appInit.port || config_1.projectConfig.server.port || 0;
		this.middlewares(appInit.middlewares);
		this.routes(appInit.routes);
		this.initializeErrorHandling();
	}
	middlewares(middlewares) {
		// this.app.use(loggerMiddleware);
		this.app.use((0, response_time_1.default)());
		this.app.use(express_1.default.json());
		this.app.use(express_1.default.urlencoded({ extended: true }));
		this.app.use(express_1.default.static("public"));
		this.app.use("*", correlation_id_middleware_1.correlationIdMiddleware);
		this.app.use((0, cors_1.default)());
		this.app.enable("trust proxy");
		this.app.use((0, helmet_1.default)());
		this.app.use(express_1.default.json());
		this.app.use(express_1.default.urlencoded({ extended: true }));
		this.app.use((0, cookie_parser_1.default)());
		this.app.set("json spaces", 4);
		middlewares.forEach((middleware) => {
			this.app.use(middleware);
		});
	}
	routes(routes) {
		this.app.use("/public", express_1.default.static("public"));
		this.app.get(["/", "/health-check"], (_req, res) =>
			__awaiter(this, void 0, void 0, function* () {
				const healthcheck = {
					uptime: process.uptime(),
					message: "OK",
					timestamp: Date.now(),
				};
				try {
					res.send(healthcheck);
				} catch (error) {
					healthcheck.message = error;
					res.status(503).send();
				}
			})
		);
		routes.forEach((route) => {
			this.app.use("/v1", route.router);
		});
	}
	initializeErrorHandling() {
		this.app.use(error_middleware_1.errorMiddleware);
	}
	listen(cb) {
		try {
			if (cb) return this.app.listen(this.port, cb);
			return this.app.listen(this.port, function () {
				console.log(
					`🚀 App running on http://localhost:${this.address().port}`
				);
			});
		} catch (error) {
			console.error(error);
		}
	}
	getServer() {
		return this.app;
	}
}
exports.Server = Server;
