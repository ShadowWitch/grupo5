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
class GetSeveralUsersController {
	constructor(userService) {
		this.userService = userService;
	}
	run(request, response, next) {
		return __awaiter(this, void 0, void 0, function* () {
			const { ids } = request.body;
			const usersFound = yield this.userService.findServeral({
				pagination: {
					limit: 10,
					offset: 0,
				},
			});
			if (!usersFound) {
				throw new Error("No users found");
			}
			try {
				response.status(200).json(usersFound);
			} catch (error) {
				next(error);
			}
		});
	}
}
