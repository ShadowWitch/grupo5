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
exports.ItemModifierController = void 0;
class ItemModifierController {
	constructor(itemModifierService) {
		this.itemModifierService = itemModifierService;
	}
	getSeveral(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { limit, offset, role } = req.query;
			const parsedLimit = limit ? parseInt(limit) : 50;
			const parsedOffset = offset ? parseInt(offset) : 0;
			const parsedRole = role ? role : undefined;
			try {
				const itemModifiersList =
					yield this.itemModifierService.findServeral({
						pagination: {
							limit: parsedLimit,
							offset: parsedOffset,
						},
						where: {
							role: parsedRole,
						},
					});
				const response = {
					data: itemModifiersList,
					limit: parsedLimit,
					offset: parsedOffset,
					total: itemModifiersList.length,
				};
				return res.status(200).json(response);
			} catch (error) {
				next(error);
			}
		});
	}
	getOne(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { id } = req.params;
			try {
				const itemModifierFound =
					yield this.itemModifierService.findById(id);
				return res.status(200).json(itemModifierFound);
			} catch (error) {
				next(error);
			}
		});
	}
	createOne(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemData = req.body;
			try {
				const itemCreated = yield this.itemModifierService.createOne(
					Object.assign(Object.assign({}, itemData), {
						created_by: req.user.id,
					})
				);
				const httpResponse = {
					data: itemCreated,
					message: "Created",
				};
				res.status(201).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
	updateOneById(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { id } = req.params;
			const itemData = req.body;
			try {
				const itemModifierUpdated =
					yield this.itemModifierService.updateById(id, itemData);
				const httpResponse = {
					data: itemModifierUpdated,
					message: "Updated",
				};
				return res.status(200).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
	updateOptions(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { id } = req.params;
			const { options } = req.body;
			try {
				const itemModifierUpdated =
					yield this.itemModifierService.updateOptions(id, options);
				const httpResponse = {
					data: itemModifierUpdated,
					message: "Updated",
				};
				return res.status(200).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
	deleteOneById(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { id } = req.params;
			try {
				const itemModifierDeleted =
					yield this.itemModifierService.deleteById(id);
				const httpResponse = {
					data: itemModifierDeleted,
					message: "Deleted",
				};
				return res.status(200).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
	deleteSeveral(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { ids } = req.body;
			const itemModifiersDeleted =
				yield this.itemModifierService.deleteMany(ids);
			try {
				return res.status(200).json(itemModifiersDeleted);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.ItemModifierController = ItemModifierController;
