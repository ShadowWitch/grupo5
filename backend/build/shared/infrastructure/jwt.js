"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
class JWT {
	constructor(secret = "myR@nd0mSupeRSeCr3t", expiresIn = 60 * 60 * 1) {
		this.secret = secret;
		this.expiresIn = expiresIn;
	}
	sign(payload, expiresIn) {
		const jwtGenerated = jsonwebtoken_1.default.sign(
			{ payload },
			this.secret,
			{
				expiresIn: expiresIn || this.expiresIn,
			}
		);
		return jwtGenerated;
	}
	verify(token) {
		const jwtVerified = jsonwebtoken_1.default.verify(token, this.secret);
		return jwtVerified;
	}
}
exports.JWT = JWT;
class Token {
	constructor() {
		this.jwt = new JWT(env_1.env.TOKEN_SECRET, env_1.env.TOKEN_EXPIRES_IN);
	}
	static get instance() {
		return this._instance || (this._instance = new this());
	}
	create(payload, expiresIn) {
		const token = this.jwt.sign(payload, expiresIn);
		return token;
	}
	verify(token) {
		const verifiedToken = this.jwt.verify(token);
		return verifiedToken;
	}
}
exports.Token = Token;
