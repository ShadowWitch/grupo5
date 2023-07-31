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
exports.CacheManager = void 0;
const redis_1 = require("redis");
class CacheManager {
	constructor(url) {
		this.client = (0, redis_1.createClient)({
			url,
		});
		this.client.on("error", (error) => {
			console.error(`Redis client error`, error);
		});
	}
	connectIfNecessary() {
		return __awaiter(this, void 0, void 0, function* () {
			if (this.client.isReady) {
				return;
			}
			yield this.client.connect();
		});
	}
	isHealthy() {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				yield this.connectIfNecessary();
				yield this.client.ping();
				return true;
			} catch (error) {
				return false;
			}
		});
	}
	set(key, value, options = {}) {
		return __awaiter(this, void 0, void 0, function* () {
			yield this.connectIfNecessary();
			const stringifiedValue =
				typeof value === "string"
					? value
					: this.stringifyValueForStoring(value);
			yield this.client.set(key, stringifiedValue, {
				PX: options.expirationInMs,
			});
		});
	}
	get(key) {
		return __awaiter(this, void 0, void 0, function* () {
			yield this.connectIfNecessary();
			const value = yield this.client.get(key);
			if (!value) {
				return null;
			}
			return this.transformValueFromStorageFormat(value);
		});
	}
	stringifyValueForStoring(value) {
		return JSON.stringify(value);
	}
	transformValueFromStorageFormat(value) {
		try {
			return JSON.parse(value);
		} catch (error) {
			return value;
		}
	}
}
exports.CacheManager = CacheManager;
