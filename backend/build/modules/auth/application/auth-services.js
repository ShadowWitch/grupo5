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
exports.AuthServices = void 0;
const env_1 = require("../../../config/env");
const exceptions_1 = require("../../../exceptions");
const bcrypt_1 = require("../../../shared/infrastructure/bcrypt");
const dependecies_1 = require("../../../shared/infrastructure/dependecies");
const jwt_1 = require("../../../shared/infrastructure/jwt");
const parameter_dependencies_1 = __importDefault(
	require("../../parameter/infrastructure/parameter-dependencies")
);
class AuthServices {
	constructor(userService) {
		this.userService = userService;
		this.bcrypt = bcrypt_1.Bcrypt.instance;
		this.tokenGenerator = jwt_1.Token.instance;
	}
	signIn(credentials) {
		return __awaiter(this, void 0, void 0, function* () {
			const user = yield this.userService
				.findByUsername(credentials.identifier)
				.then((user) => user)
				.catch((e) => {
					if (e instanceof exceptions_1.NotFoundException) {
						return this.userService.findByEmail(
							credentials.identifier
						);
					}
					throw e;
				});
			const maxLoginAttempts =
				(yield parameter_dependencies_1.default.services.findByCode(
					"MAX_LOGIN_ATTEMPTS"
				)) || "5";
			const tokenExpirationTime =
				(yield parameter_dependencies_1.default.services.findByCode(
					"TOKEN_EXPIRATION_TIME"
				)) || "5";
			const isValidPassword = yield this.bcrypt.compareAsync(
				credentials.password,
				user.password
			);
			if (!isValidPassword || !user.enabled) {
				throw new exceptions_1.HttpException(
					401,
					"Invalid credentials"
				);
			}
			const token = this.tokenGenerator.create(
				{
					user: user.id,
					company: user.Employee.company_id,
				},
				60 * 60 * Number(tokenExpirationTime)
			);
			dependecies_1.emailSender.sendEmail(
				user.email,
				"Alerta de inicio de sesión",
				`Se ha iniciado sesión en su cuenta`,
				`
				<h1>Alerta de inicio de sesión</h1>
				<p>Se ha iniciado sesión en su cuenta</p>
				<p>Si no ha sido usted, haga click en el siguiente enlace para recuperar su cuenta:</p>
				<a href="${env_1.env.CLIENT_PUBLIC_URL}/recover">Recuperar cuenta</a>
				<p>Si ha sido usted, ignore este mensaje</p>
			`
			);
			return { user: user, token };
		});
	}
	signOut(userLogged) {
		return __awaiter(this, void 0, void 0, function* () {
			const { id } = userLogged;
			const user = yield this.userService.findById(id);
			return user;
		});
	}
	session(userLogged) {
		return __awaiter(this, void 0, void 0, function* () {
			const { id } = userLogged;
			const user = yield this.userService.findById(id);
			return user;
		});
	}
	desactivateAccount(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const userDesativated = yield this.userService.updateById(id, {
				enabled: false,
			});
			return userDesativated;
		});
	}
	activateAccount(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const userDesativated = yield this.userService.updateById(id, {
				enabled: true,
			});
			return userDesativated;
		});
	}
	changePassword(id, oldPassword, newPassword) {
		return __awaiter(this, void 0, void 0, function* () {
			const userFound = yield this.userService.findById(id);
			const isDiffrentPassword = yield this.bcrypt.compareAsync(
				newPassword,
				userFound.password
			);
			if (isDiffrentPassword) {
				throw new exceptions_1.HttpException(
					400,
					"New password must be different"
				);
			}
			const hashedPassword = yield this.bcrypt.hashAsync(newPassword);
			const userUpdated = yield this.userService.updateById(id, {
				password: hashedPassword,
			});
			return userUpdated;
		});
	}
	forgotPassword(email) {
		return __awaiter(this, void 0, void 0, function* () {
			const userFound = yield this.userService.findByEmail(email);
			if (userFound instanceof exceptions_1.NotFoundException) {
				throw new exceptions_1.HttpException(
					401,
					"Invalid credentials"
				);
			}
			const resetPasswordToken = this.tokenGenerator.create({
				user: userFound.id,
			});
			dependecies_1.emailSender.sendEmail(
				userFound.email,
				"Recuperar cuenta",
				`Se ha solicitado un cambio de contraseña para su cuenta. Si no ha sido usted, ignore este mensaje. Si ha sido usted, haga click en el siguiente enlace: ${process.env.CLIENT_PUBLIC_URL}/reset-password/${userFound.id}`,
				`
				<h1>Cambio de contraseña</h1>
				<p>Se ha solicitado un cambio de contraseña para su cuenta. Si no ha sido usted, ignore este mensaje. Si ha sido usted, haga click en el siguiente enlace:</p>
				<a href="${env_1.env.CLIENT_PUBLIC_URL}/reset-password?token=${resetPasswordToken}">Cambiar contraseña</a>

			`
			);
			return userFound;
		});
	}
	resetPassword(id, newPassword) {
		return __awaiter(this, void 0, void 0, function* () {
			const hashedPassword = yield this.bcrypt.hashAsync(newPassword);
			const userUpdated = yield this.userService.updateById(id, {
				password: hashedPassword,
			});
			yield dependecies_1.emailSender.sendEmail(
				userUpdated.email,
				"Cambio de contraseña",
				`Se ha cambiado la contraseña de su cuenta`,
				`
				<h1>Cambio de contraseña</h1>
				<p>Se ha cambiado la contraseña de su cuenta</p>
				<p>Si no ha sido usted, haga click en el siguiente enlace para recuperar su cuenta:</p>
				<a href="${env_1.env.CLIENT_PUBLIC_URL}/recover">Recuperar cuenta</a>
			`
			);
			return userUpdated;
		});
	}
}
exports.AuthServices = AuthServices;
