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
exports.KyselyUserRoleRepository = void 0;
class KyselyUserRoleRepository {
	constructor(database) {
		this.database = database;
	}
	createOne(data) {
		return __awaiter(this, void 0, void 0, function* () {
			throw new Error("Method not implemented.");
		});
	}
	createMany(data) {
		return __awaiter(this, void 0, void 0, function* () {
			throw new Error("Method not implemented.");
		});
	}
	updateById(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			throw new Error("Method not implemented.");
		});
	}
	updateMany(ids, data) {
		return __awaiter(this, void 0, void 0, function* () {
			throw new Error("Method not implemented.");
		});
	}
	deleteById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			throw new Error("Method not implemented.");
		});
	}
	deleteMany(ids) {
		return __awaiter(this, void 0, void 0, function* () {
			throw new Error("Method not implemented.");
		});
	}
	findMany(options) {
		return __awaiter(this, void 0, void 0, function* () {
			throw new Error("Method not implemented.");
		});
	}
	findById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			throw new Error("Method not implemented.");
		});
	}
	findByPhoneContact(phone) {
		return __awaiter(this, void 0, void 0, function* () {
			throw new Error("Method not implemented.");
		});
	}
	findByRoleName(email) {
		return __awaiter(this, void 0, void 0, function* () {
			throw new Error("Method not implemented.");
		});
	}
	findByPhysicalId(id) {
		return __awaiter(this, void 0, void 0, function* () {
			throw new Error("Method not implemented.");
		});
	}
}
exports.KyselyUserRoleRepository = KyselyUserRoleRepository;
