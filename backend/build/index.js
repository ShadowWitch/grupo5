"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const backendApp_1 = __importDefault(require("./backendApp"));
backendApp_1.default.listen();
// Attemps sign in by params
// Token expire time param
// Username similar to first name and last name
// Password min and max length by params
// Number of attempts by params
