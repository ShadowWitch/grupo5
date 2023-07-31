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
exports.TaxController = void 0;
class TaxController {
	constructor(taxService) {
		this.taxService = taxService;
	}
	getSeveral(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { limit, offset, role } = req.query;
			const parsedLimit = limit ? parseInt(limit) : 50;
			const parsedOffset = offset ? parseInt(offset) : 0;
			const parsedRole = role ? role : undefined;
			try {
				const taxesList = yield this.taxService.findServeral({
					pagination: {
						limit: parsedLimit,
						offset: parsedOffset,
					},
					where: {
						role: parsedRole,
					},
				});
				const response = {
					data: taxesList,
					limit: parsedLimit,
					offset: parsedOffset,
					total: taxesList.length,
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
				const taxFound = yield this.taxService.findById(id);
				return res.status(200).json(taxFound);
			} catch (error) {
				next(error);
			}
		});
	}
	getOneByName(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { name } = req.params;
			try {
				const taxFound = yield this.taxService.findByName(name);
				return res.status(200).json(taxFound);
			} catch (error) {
				next(error);
			}
		});
	}
	getOneByRate(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { rate } = req.params;
			const parsedRate = parseFloat(rate);
			try {
				const taxFound = yield this.taxService.findOneByRate(
					parsedRate
				);
				return res.status(200).json(taxFound);
			} catch (error) {
				next(error);
			}
		});
	}
	createOne(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const taxData = req.body;
			try {
				const taxCreated = yield this.taxService.createOne(taxData);
				const httpResponse = {
					data: taxCreated,
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
			const taxData = req.body;
			try {
				const taxUpdated = yield this.taxService.updateById(
					id,
					taxData
				);
				const httpResponse = {
					data: taxUpdated,
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
				const taxDeleted = yield this.taxService.deleteById(id);
				const httpResponse = {
					data: taxDeleted,
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
			const taxesDeleted = yield this.taxService.deleteMany(ids);
			try {
				return res.status(200).json(taxesDeleted);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.TaxController = TaxController;
