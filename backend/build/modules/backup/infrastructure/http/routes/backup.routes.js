"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupRouter = void 0;
const express_1 = require("express");
class BackupRouter {
	constructor(purchaseController) {
		this.purchaseController = purchaseController;
		this.path = "/backups";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.post(
			this.path,
			this.purchaseController.createBackup.bind(this.purchaseController)
		);
	}
}
exports.BackupRouter = BackupRouter;
