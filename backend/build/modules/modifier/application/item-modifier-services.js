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
exports.ItemModifierServices = void 0;
const exceptions_1 = require("../../../exceptions");
class ItemModifierServices {
	constructor(itemModifierRepository) {
		this.itemModifierRepository = itemModifierRepository;
	}
	findServeral(options) {
		return __awaiter(this, void 0, void 0, function* () {
			const where = {};
			const itemsFound = yield this.itemModifierRepository.findMany({
				pagination: options.pagination,
				where,
			});
			return itemsFound;
		});
	}
	findById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemFound = yield this.itemModifierRepository.findById(id);
			if (!itemFound) {
				throw new exceptions_1.NotFoundException();
			}
			return itemFound;
		});
	}
	createOne(data) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemAlreadyExists =
				yield this.itemModifierRepository.findByName(data.name);
			if (itemAlreadyExists) {
				throw new exceptions_1.HttpException(409, "Already exists");
			}
			const itemCreated = yield this.itemModifierRepository.createOne(
				data
			);
			if (!itemCreated) throw new Error("No item created");
			return itemCreated;
		});
	}
	updateById(id, data) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemUpdated = yield this.itemModifierRepository.updateById(
				id,
				data
			);
			if (!itemUpdated) {
				throw new Error("No item updated");
			}
			return itemUpdated;
		});
	}
	updateOptions(id, options) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemUpdated = yield this.itemModifierRepository.updateOptions(
				id,
				options
			);
			if (!itemUpdated) {
				throw new Error("No item updated");
			}
			return itemUpdated;
		});
	}
	deleteById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemDeleted = yield this.itemModifierRepository.deleteById(
				id
			);
			if (!itemDeleted) {
				throw new Error("No item deleted");
			}
			return itemDeleted;
		});
	}
	deleteMany(ids) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemsDeleted = yield this.itemModifierRepository.deleteMany(
				ids
			);
			if (!itemsDeleted) {
				throw new Error("No items deleted");
			}
			return itemsDeleted;
		});
	}
}
exports.ItemModifierServices = ItemModifierServices;
