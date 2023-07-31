"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const user_dependencies_1 = __importDefault(
	require("../../user/infrastructure/user-dependencies")
);
const auth_services_1 = require("../application/auth-services");
const auth_controller_1 = require("./http/controllers/auth-controller");
const auth_routes_1 = require("./http/routes/auth.routes");
const authServices = new auth_services_1.AuthServices(
	user_dependencies_1.default.services
);
const authController = new auth_controller_1.AuthController(authServices);
const authRouter = new auth_routes_1.AuthRouter(authController);
const authDependencies = {
	controller: authController,
	services: authServices,
	router: authRouter,
};
exports.default = authDependencies;
