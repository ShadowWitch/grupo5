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
exports.InvoiceLoteController = void 0;
class InvoiceLoteController {
	constructor(invoiceLoteService) {
		this.invoiceLoteService = invoiceLoteService;
	}
	getSeveral(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { limit, offset } = req.query;
			const parsedLimit = limit ? parseInt(limit) : 50;
			const parsedOffset = offset ? parseInt(offset) : 0;
			try {
				const invoiceLotesFound =
					yield this.invoiceLoteService.findServeral({
						pagination: {
							limit: parsedLimit,
							offset: parsedOffset,
						},
					});
				const response = {
					data: invoiceLotesFound,
					limit: parsedLimit,
					offset: parsedOffset,
					total: invoiceLotesFound.length,
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
				const invoiceLotesFound =
					yield this.invoiceLoteService.findById(id);
				return res.status(200).json(invoiceLotesFound);
			} catch (error) {
				next(error);
			}
		});
	}
	getOneByName(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { name } = req.params;
			try {
				const invoiceLotesFound =
					yield this.invoiceLoteService.findByName(name);
				return res.status(200).json(invoiceLotesFound);
			} catch (error) {
				next(error);
			}
		});
	}
	createOne(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const invoiceLoteData = req.body;
			try {
				const invoiceLoteCreated =
					yield this.invoiceLoteService.createOne(invoiceLoteData);
				const httpResponse = {
					data: invoiceLoteCreated,
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
			const invoicData = req.body;
			try {
				const invoicUpdated = yield this.invoiceLoteService.updateById(
					id,
					invoicData
				);
				const httpResponse = {
					data: invoicUpdated,
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
				const invoicDeleted = yield this.invoiceLoteService.deleteById(
					id
				);
				const httpResponse = {
					data: invoicDeleted,
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
			const invoicesDeleted = yield this.invoiceLoteService.deleteMany(
				ids
			);
			try {
				return res.status(200).json(invoicesDeleted);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.InvoiceLoteController = InvoiceLoteController;
