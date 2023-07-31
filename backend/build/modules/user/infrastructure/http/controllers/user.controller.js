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
exports.UserController = void 0;
class UserController {
	constructor(userService) {
		this.userService = userService;
	}
	getSeveral(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			// req.log.debug("Calling getSeveral endpoint with params: %o", req.query);
			const { limit, offset, role } = req.query;
			const parsedLimit = limit ? parseInt(limit) : 50;
			const parsedOffset = offset ? parseInt(offset) : 0;
			const parsedRole = role ? role : undefined;
			try {
				const usersList = yield this.userService.findServeral({
					pagination: {
						limit: parsedLimit,
						offset: parsedOffset,
					},
					where: {
						role: parsedRole,
					},
				});
				const response = {
					data: usersList,
					limit: parsedLimit,
					offset: parsedOffset,
					total: usersList.length,
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
				const userFound = yield this.userService.findById(id);
				return res.status(200).json(userFound);
			} catch (error) {
				next(error);
			}
		});
	}
	createOne(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const userData = req.body;
			try {
				const userCreated = yield this.userService.createOne(
					Object.assign(Object.assign({}, userData), {
						created_by: req.user.id,
					})
				);
				const httpResponse = {
					data: userCreated,
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
			const userData = req.body;
			try {
				const userUpdated = yield this.userService.updateById(
					id,
					userData
				);
				const httpResponse = {
					data: userUpdated,
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
				const userDeleted = yield this.userService.deleteById(id);
				const httpResponse = {
					data: userDeleted,
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
			const usersDeleted = yield this.userService.deleteMany(ids);
			try {
				return res.status(200).json(usersDeleted);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.UserController = UserController;
