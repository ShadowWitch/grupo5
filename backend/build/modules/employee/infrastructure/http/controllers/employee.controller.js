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
exports.EmployeeController = void 0;
class EmployeeController {
	constructor(employeeService) {
		this.employeeService = employeeService;
	}
	getSeveral(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { limit, offset, role } = req.query;
			const parsedLimit = limit ? parseInt(limit) : 50;
			const parsedOffset = offset ? parseInt(offset) : 0;
			const parsedRole = role ? role : undefined;
			try {
				const employeesList = yield this.employeeService.findServeral({
					pagination: {
						limit: parsedLimit,
						offset: parsedOffset,
					},
					where: {
						role: parsedRole,
					},
				});
				const response = {
					data: employeesList,
					limit: parsedLimit,
					offset: parsedOffset,
					total: employeesList.length,
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
				const employeeFound = yield this.employeeService.findById(id);
				return res.status(200).json(employeeFound);
			} catch (error) {
				next(error);
			}
		});
	}
	createOne(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const employeeData = req.body;
			try {
				const employeeCreated = yield this.employeeService.createOne(
					Object.assign(Object.assign({}, employeeData), {
						created_by: req.user.id,
					})
				);
				const httpResponse = {
					data: employeeCreated,
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
			const employeeData = req.body;
			try {
				const employeeUpdated = yield this.employeeService.updateById(
					id,
					employeeData
				);
				const httpResponse = {
					data: employeeUpdated,
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
				const employeeDeleted = yield this.employeeService.deleteById(
					id
				);
				const httpResponse = {
					data: employeeDeleted,
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
			const employeesDeleted = yield this.employeeService.deleteMany(ids);
			try {
				return res.status(200).json(employeesDeleted);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.EmployeeController = EmployeeController;
