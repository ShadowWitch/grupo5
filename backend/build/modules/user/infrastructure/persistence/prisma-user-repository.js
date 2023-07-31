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
exports.PrismaUserRepository = void 0;
class PrismaUserRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}
	findByUsername(username) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.user.findUnique({
				where: { username },
				include: {
					Employee: true,
				},
			});
			return item;
		});
	}
	findUserData(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const user = yield this.prisma.user.findUnique({
				where: { id },
				include: {
					Employee: true,
				},
			});
			return user;
		});
	}
	findSessionsByUserId(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const userSessions = yield this.prisma.user.findUnique({
				where: { id },
			});
			return userSessions;
		});
	}
	findByRoleId(roleId) {
		return __awaiter(this, void 0, void 0, function* () {
			const items = yield this.prisma.user.findMany({
				where: {
					user_role_id: roleId,
				},
			});
			return items;
		});
	}
	findByEmail(email) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.user.findUnique({
				where: { email },
				include: {
					Employee: true,
				},
			});
			return item;
		});
	}
	findMany(options) {
		var _a, _b;
		return __awaiter(this, void 0, void 0, function* () {
			const items = yield this.prisma.user.findMany({
				where:
					options === null || options === void 0
						? void 0
						: options.where,
				take:
					(_a =
						options === null || options === void 0
							? void 0
							: options.pagination) === null || _a === void 0
						? void 0
						: _a.limit,
				skip:
					(_b =
						options === null || options === void 0
							? void 0
							: options.pagination) === null || _b === void 0
						? void 0
						: _b.offset,
				include: {
					Employee: true,
					UserRole: true,
				},
			});
			return items;
		});
	}
	findById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.user.findUnique({
				where: { id },
				include: {
					Employee: true,
					UserRole: true,
				},
			});
			return item;
		});
	}
	createOne(data) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.user.create({
				data,
			});
			return item;
		});
	}
	createMany(data) {
		return __awaiter(this, void 0, void 0, function* () {
			const items = yield this.prisma.user.createMany({
				data,
				skipDuplicates: true,
			});
			return items.count;
		});
	}
	updateById(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.user.update({
				where: { id },
				data,
			});
			return item;
		});
	}
	updateMany(ids, data) {
		return __awaiter(this, void 0, void 0, function* () {
			const isIdsArrayEmpty = ids.length === 0;
			const items = yield this.prisma.user.updateMany({
				where: Object.assign(
					{},
					!isIdsArrayEmpty && { id: { in: ids } }
				),
				data,
			});
			return items.count;
		});
	}
	deleteById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.user.delete({
				where: { id },
			});
			return item;
		});
	}
	deleteMany(ids) {
		return __awaiter(this, void 0, void 0, function* () {
			const isIdsArrayEmpty = ids.length === 0;
			const itemsDeleted = yield this.prisma.user.deleteMany({
				where: Object.assign(
					{},
					!isIdsArrayEmpty && { id: { in: ids } }
				),
			});
			return itemsDeleted.count;
		});
	}
}
exports.PrismaUserRepository = PrismaUserRepository;
