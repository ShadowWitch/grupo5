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
exports.InvoiceController = void 0;
class InvoiceController {
	constructor(invoiceService) {
		this.invoiceService = invoiceService;
	}
	getSeveral(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { limit, offset, role } = req.query;
			const parsedLimit = limit ? parseInt(limit) : 50;
			const parsedOffset = offset ? parseInt(offset) : 0;
			const parsedRole = role ? role : undefined;
			try {
				const invoicesList = yield this.invoiceService.findServeral({
					pagination: {
						limit: parsedLimit,
						offset: parsedOffset,
					},
					where: {
						role: parsedRole,
					},
				});
				const response = {
					data: invoicesList,
					limit: parsedLimit,
					offset: parsedOffset,
					total: invoicesList.length,
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
				const invoiceFound = yield this.invoiceService.findById(id);
				return res.status(200).json(invoiceFound);
			} catch (error) {
				next(error);
			}
		});
	}
	getOneByName(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { name } = req.params;
			try {
				const invoiceFound = yield this.invoiceService.findByName(name);
				return res.status(200).json(invoiceFound);
			} catch (error) {
				next(error);
			}
		});
	}
	createOne(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const invoicData = req.body;
			try {
				const invoicCreated = yield this.invoiceService.createOne(
					invoicData
				);
				const httpResponse = {
					data: invoicCreated,
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
				const invoicUpdated = yield this.invoiceService.updateById(
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
				const invoicDeleted = yield this.invoiceService.deleteById(id);
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
			const invoicesDeleted = yield this.invoiceService.deleteMany(ids);
			try {
				return res.status(200).json(invoicesDeleted);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.InvoiceController = InvoiceController;
