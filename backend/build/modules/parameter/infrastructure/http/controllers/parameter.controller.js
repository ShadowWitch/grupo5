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
exports.ParameterController = void 0;
class ParameterController {
	constructor(parameterService) {
		this.parameterService = parameterService;
	}
	getSeveral(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { limit, offset } = req.query;
			const parsedLimit = limit ? parseInt(limit) : 50;
			const parsedOffset = offset ? parseInt(offset) : 0;
			try {
				const parametersList = yield this.parameterService.findServeral(
					{
						pagination: {
							limit: parsedLimit,
							offset: parsedOffset,
						},
					}
				);
				const response = {
					data: parametersList,
					limit: parsedLimit,
					offset: parsedOffset,
					total: parametersList.length,
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
				const taxFound = yield this.parameterService.findById(id);
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
				const taxFound = yield this.parameterService.findByName(name);
				return res.status(200).json(taxFound);
			} catch (error) {
				next(error);
			}
		});
	}
	getOneByValue(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { value } = req.params;
			try {
				const taxFound = yield this.parameterService.findByValue(value);
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
				const taxCreated = yield this.parameterService.createOne(
					taxData
				);
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
				const taxUpdated = yield this.parameterService.updateById(
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
				const taxDeleted = yield this.parameterService.deleteById(id);
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
			const parametersDeleted = yield this.parameterService.deleteMany(
				ids
			);
			try {
				return res.status(200).json(parametersDeleted);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.ParameterController = ParameterController;
