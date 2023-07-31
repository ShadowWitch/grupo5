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
exports.CoursesPostController = void 0;
class CoursesPostController {
	constructor(userCreateService) {
		this.userCreateService = userCreateService;
	}
	run(request, response, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const userData = request.body;
			try {
				const userCreated = yield this.userCreateService.execute.bind(
					this.userCreateService
				)(userData);
				const httpResponse = {
					data: userCreated,
					message: "Created",
				};
				response.status(201).json(httpResponse);
			} catch (error) {
				next(error);
			}
		});
	}
}
exports.CoursesPostController = CoursesPostController;
