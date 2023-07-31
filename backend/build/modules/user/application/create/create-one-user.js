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
exports.UserCreator = void 0;
const config_1 = require("../../../../config");
const exceptions_1 = require("../../../../exceptions");
class UserCreator {
	constructor(userRepository, bcrypt, emailSender) {
		this.userRepository = userRepository;
		this.bcrypt = bcrypt;
		this.emailSender = emailSender;
	}
	execute(data) {
		return __awaiter(this, void 0, void 0, function* () {
			const userAlreadyExists = yield this.userRepository.findByEmail(
				data.email
			);
			if (userAlreadyExists) {
				throw new exceptions_1.HttpException(
					409,
					"User already exists"
				);
			}
			const hashedPassword = yield this.bcrypt.hashAsync(data.password);
			data.password = hashedPassword;
			const itemCreated = yield this.userRepository.createOne(data);
			if (!itemCreated) throw new Error("No item created");
			if (itemCreated.email) {
				this.emailSender.sendEmail(
					itemCreated.email,
					"Bienvenido a la plataforma",
					`Bienvenido a la plataforma`
				);
				this.emailSender.sendEmail(
					itemCreated.email,
					"Confirma tu cuenta de usuario",
					`Por favor, confirma tu cuenta de usuario haciendo click en el siguiente enlace: ${config_1.projectConfig.client.publicURL}/confirm-account`
				);
			}
			return itemCreated;
		});
	}
}
exports.UserCreator = UserCreator;
