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
exports.PrismaItemModifierRepository = void 0;
class PrismaItemModifierRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}
	findMany(options) {
		var _a, _b;
		return __awaiter(this, void 0, void 0, function* () {
			const items = yield this.prisma.itemModifier.findMany({
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
					options: true,
				},
			});
			return items;
		});
	}
	findById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.itemModifier.findUnique({
				where: { id },
				include: {
					options: true,
				},
			});
			return item;
		});
	}
	findByName(name) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.itemModifier.findFirst({
				where: { name },
			});
			return item;
		});
	}
	createOne(data) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.itemModifier.create({
				data: {
					name: data.name,
					options: {
						createMany: {
							data: data.options.map((modifier) => ({
								name: modifier.name,
								price: modifier.price,
							})),
						},
					},
				},
				include: {
					options: true,
				},
			});
			return item;
		});
	}
	createMany(data) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemsCreated = yield this.prisma.itemModifier.createMany({
				data,
				skipDuplicates: true,
			});
			return itemsCreated;
		});
	}
	updateById(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.itemModifier.update({
				where: { id },
				data: {
					name: data.name,
					options: {
						upsert: data.options.map((option) => ({
							where: { id: option.id },
							update: {
								name: option.name,
								price: option.price,
							},
							create: {
								name: option.name,
								price: option.price,
							},
						})),
					},
				},
				include: {
					options: true,
				},
			});
			return item;
		});
	}
	updateOptions(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.itemModifier.update({
				where: { id },
				data: {
					options: {
						upsert: options.map((option) => ({
							where: { id: option.id },
							create: {
								name: option.name,
								price: option.price,
							},
							update: {
								name: option.name,
								price: option.price,
							},
						})),
					},
				},
				include: {
					options: true,
				},
			});
			return item;
		});
	}
	updateMany(ids, data) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemsUpdated = yield this.prisma.itemModifier.updateMany({
				where: {
					id: {
						in: ids,
					},
				},
				data,
			});
			return itemsUpdated;
		});
	}
	deleteById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.itemModifier.delete({
				where: { id },
			});
			return item;
		});
	}
	deleteModifierOption(modifierId, optionId) {
		return __awaiter(this, void 0, void 0, function* () {
			yield this.prisma.itemModifier.update({
				where: { id: modifierId },
				data: {
					options: {
						delete: { id: optionId },
					},
				},
			});
		});
	}
	deleteMany(ids) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemsDeleted = yield this.prisma.itemModifier.deleteMany({
				where: {
					id: {
						in: ids,
					},
				},
			});
			return itemsDeleted;
		});
	}
}
exports.PrismaItemModifierRepository = PrismaItemModifierRepository;
