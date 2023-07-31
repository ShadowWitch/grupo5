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
exports.PrismaCategoryRepository = void 0;
class PrismaCategoryRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}
	findMany(options) {
		var _a, _b;
		return __awaiter(this, void 0, void 0, function* () {
			const items = yield this.prisma.category.findMany({
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
			});
			return items;
		});
	}
	findById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.category.findUnique({
				where: { id },
				include: {
					items: true,
				},
			});
			return item;
		});
	}
	findByName(name) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.category.findUnique({
				where: { name },
			});
			return item;
		});
	}
	createOne(data) {
		return __awaiter(this, void 0, void 0, function* () {
			console.log(data);
			const item = yield this.prisma.category.create({
				data,
			});
			return item;
		});
	}
	createMany(data) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemsCreated = yield this.prisma.category.createMany({
				data,
				skipDuplicates: true,
			});
			return itemsCreated;
		});
	}
	updateById(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			const item = yield this.prisma.category.update({
				where: { id },
				data,
			});
			return item;
		});
	}
	updateMany(ids, data) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemsUpdated = yield this.prisma.category.updateMany({
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
			const item = yield this.prisma.category.delete({
				where: { id },
			});
			return item;
		});
	}
	deleteMany(ids) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemsDeleted = yield this.prisma.category.deleteMany({
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
exports.PrismaCategoryRepository = PrismaCategoryRepository;
