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
exports.MenuController = void 0;
class MenuController {
	constructor(menuService) {
		this.menuService = menuService;
	}
	getSeveral(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { limit, offset } = req.query;
			const parsedLimit = limit ? parseInt(limit) : 50;
			const parsedOffset = offset ? parseInt(offset) : 0;
			try {
				const menusList = yield this.menuService.findServeral({
					pagination: {
						limit: parsedLimit,
						offset: parsedOffset,
					},
				});
				const response = {
					data: menusList,
					limit: parsedLimit,
					offset: parsedOffset,
					total: menusList.length,
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
				const menuFound = yield this.menuService.findById(id);
				return res.status(200).json(menuFound);
			} catch (error) {
				next(error);
			}
		});
	}
	getOneByName(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { name } = req.params;
			try {
				const menuFound = yield this.menuService.findByName(name);
				return res.status(200).json(menuFound);
			} catch (error) {
				next(error);
			}
		});
	}
	createOne(req, res, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const menuData = req.body;
			try {
				const menuCreated = yield this.menuService.createOne(
					Object.assign(Object.assign({}, menuData), {
						created_by: req.user.id,
					})
				);
				const httpResponse = {
					data: menuCreated,
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
			const menuData = req.body;
			try {
				const menuUpdated = yield this.menuService.updateById(
					id,
					menuData
				);
				const httpResponse = {
					data: menuUpdated,
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
				const menuDeleted = yield this.menuService.deleteById(id);
				const httpResponse = {
					data: menuDeleted,
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
			const menusDeleted = yield this.menuService.deleteMany(ids);
			try {
				return res.status(200).json(menusDeleted);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.MenuController = MenuController;
