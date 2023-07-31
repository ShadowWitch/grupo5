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
exports.ItemVariantController = void 0;
class ItemVariantController {
	constructor(itemVariantService) {
		this.itemVariantService = itemVariantService;
	}
	getSeveral(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { limit, offset, role } = req.query;
			const parsedLimit = limit ? parseInt(limit) : 50;
			const parsedOffset = offset ? parseInt(offset) : 0;
			const parsedRole = role ? role : undefined;
			try {
				const itemVariantsList =
					yield this.itemVariantService.findServeral({
						pagination: {
							limit: parsedLimit,
							offset: parsedOffset,
						},
						where: {
							role: parsedRole,
						},
					});
				const response = {
					data: itemVariantsList,
					limit: parsedLimit,
					offset: parsedOffset,
					total: itemVariantsList.length,
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
				const itemVariantFound = yield this.itemVariantService.findById(
					id
				);
				return res.status(200).json(itemVariantFound);
			} catch (error) {
				next(error);
			}
		});
	}
	createOne(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const itemData = req.body;
			try {
				const itemCreated = yield this.itemVariantService.createOne(
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
				const itemVariantUpdated =
					yield this.itemVariantService.updateById(id, itemData);
				const httpResponse = {
					data: itemVariantUpdated,
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
				const itemVariantDeleted =
					yield this.itemVariantService.deleteById(id);
				const httpResponse = {
					data: itemVariantDeleted,
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
			const itemVariantsDeleted =
				yield this.itemVariantService.deleteMany(ids);
			try {
				return res.status(200).json(itemVariantsDeleted);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.ItemVariantController = ItemVariantController;
