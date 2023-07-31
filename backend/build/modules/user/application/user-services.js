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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const env_1 = require("../../../config/env");
const exceptions_1 = require("../../../exceptions");
const bcrypt_1 = require("../../../shared/infrastructure/bcrypt");
class UserServices {
	constructor(userRepository, emailSender) {
		this.userRepository = userRepository;
		this.emailSender = emailSender;
		this.bcrypt = bcrypt_1.Bcrypt.instance;
	}
	findServeral(options) {
		return __awaiter(this, void 0, void 0, function* () {
			const where = {};
			const itemsFound = yield this.userRepository.findMany({
				pagination: options.pagination,
				where,
			});
			return itemsFound;
		});
	}
	findByEmail(email) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemFound = yield this.userRepository.findByEmail(email);
			if (!itemFound) {
				throw new exceptions_1.NotFoundException();
			}
			return itemFound;
		});
	}
	findByUsername(username) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemFound = yield this.userRepository.findByUsername(
				username
			);
			if (!itemFound) {
				throw new exceptions_1.NotFoundException();
			}
			return itemFound;
		});
	}
	findById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemFound = yield this.userRepository.findById(id);
			if (!itemFound) {
				throw new exceptions_1.NotFoundException();
			}
			return itemFound;
		});
	}
	getUserInfo(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemFound = yield this.userRepository.findById(id);
			if (!itemFound) {
				throw new exceptions_1.NotFoundException();
			}
			return itemFound;
		});
	}
	createOne(data) {
		return __awaiter(this, void 0, void 0, function* () {
			const userAlreadyExists = yield this.userRepository.findByEmail(
				data.email
			);
			if (userAlreadyExists)
				throw new exceptions_1.HttpException(
					409,
					"User already exists"
				);
			const hashedPassword = yield this.bcrypt.hashAsync(data.password);
			data.password = hashedPassword;
			data.username = String(data.username).toLowerCase();
			const itemCreated = yield this.userRepository.createOne(data);
			if (!itemCreated) throw new Error("No item created");
			if (itemCreated.email) {
				this.emailSender.sendEmail(
					itemCreated.email,
					"Bienvenido a la plataforma",
					`Bienvenido a la plataforma. Gracias por registrarte. Si no has solicitado la creación de una cuenta de usuario, ignora este mensaje.`,
					`
					<h1>Bienvenido a la plataforma</h1>
					<p>Gracias por registrarte en la plataforma.</p>
					<p>Si no has solicitado la creación de una cuenta de usuario, ignora este mensaje.</p>
				`
				);
				this.emailSender.sendEmail(
					itemCreated.email,
					"Confirma tu cuenta de usuario",
					`Por favor, confirma tu cuenta de usuario haciendo click en el siguiente enlace: ${env_1.env.CLIENT_PUBLIC_URL}/account-confirmation`,
					`
					<h1>Confirma tu cuenta de usuario</h1>
					<p>Por favor, confirma tu cuenta de usuario haciendo click en el siguiente enlace: <a href="${env_1.env.CLIENT_PUBLIC_URL}/account-confirmation">Confirmar cuenta</a></p>
					<p>Si no has solicitado la creación de una cuenta de usuario, ignora este mensaje.</p>
				`
				);
			}
			return itemCreated;
		});
	}
	updateById(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemUpdated = yield this.userRepository.updateById(id, data);
			if (!itemUpdated) {
				throw new Error("No item updated");
			}
			return itemUpdated;
		});
	}
	deleteById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemDeleted = yield this.userRepository.deleteById(id);
			if (!itemDeleted) {
				throw new Error("No item deleted");
			}
			return itemDeleted;
		});
	}
	deleteMany(ids) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemsDeleted = yield this.userRepository.deleteMany(ids);
			if (!itemsDeleted) {
				throw new Error("No items deleted");
			}
			return itemsDeleted;
		});
	}
}
exports.UserServices = UserServices;
