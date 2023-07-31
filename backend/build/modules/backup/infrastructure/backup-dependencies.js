"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const backup_services_1 = require("../application/backup-services");
const backup_controller_1 = require("./http/controllers/backup.controller");
const backup_routes_1 = require("./http/routes/backup.routes");
const prisma_backup_repository_1 = require("./persistence/prisma-backup-repository");
const backupRepository = new prisma_backup_repository_1.PrismaBackupRepository(
	prisma_1.prisma
);
const backupServices = new backup_services_1.BackupServices(backupRepository);
const backupController = new backup_controller_1.BackupController(
	backupServices
);
const backupRouter = new backup_routes_1.BackupRouter(backupController);
const backupDependencies = {
	controller: backupController,
	services: backupServices,
	repository: backupRepository,
	router: backupRouter,
};
exports.default = backupDependencies;
