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
exports.SaleController = void 0;
class SaleController {
	constructor(saleService) {
		this.saleService = saleService;
	}
	getSeveral(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { limit, offset, today } = req.query;
			const parsedLimit = limit ? parseInt(limit) : 50;
			const parsedOffset = offset ? parseInt(offset) : 0;
			const parsedToday = today ? today === "true" : false;
			try {
				const salesList = yield this.saleService.findServeral({
					pagination: {
						limit: parsedLimit,
						offset: parsedOffset,
					},
					where: Object.assign(
						{},
						parsedToday && {
							created_at: {
								gte: new Date(
									new Date().getTime() -
										1000 * 60 * 60 * 24 * 7
								),
								lte: new Date(),
							},
						}
					),
				});
				const response = {
					data: salesList,
					limit: parsedLimit,
					offset: parsedOffset,
					total: salesList.length,
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
				const saleFound = yield this.saleService.findById(id);
				return res.status(200).json(saleFound);
			} catch (error) {
				next(error);
			}
		});
	}
	createOne(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const saleData = req.body;
			try {
				const saleCreated = yield this.saleService.createOne(saleData);
				const httpResponse = {
					data: saleCreated,
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
			const saleData = req.body;
			try {
				const saleUpdated = yield this.saleService.updateById(
					id,
					saleData
				);
				const httpResponse = {
					data: saleUpdated,
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
				const saleDeleted = yield this.saleService.deleteById(id);
				const httpResponse = {
					data: saleDeleted,
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
			const salesDeleted = yield this.saleService.deleteMany(ids);
			try {
				return res.status(200).json(salesDeleted);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.SaleController = SaleController;
