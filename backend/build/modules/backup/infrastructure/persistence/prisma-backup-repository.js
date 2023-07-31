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
exports.PrismaBackupRepository = void 0;
const prisma_backup_1 = require("@vorlefan/prisma-backup");
class PrismaBackupRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}
	createBackup() {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const tables = yield this.prisma.$transaction([
					this.prisma.user.findMany(),
					this.prisma.employee.findMany(),
					this.prisma.item.findMany(),
					this.prisma.itemModifier.findMany(),
					this.prisma.itemModifierOption.findMany(),
					this.prisma.itemVariant.findMany(),
					this.prisma.itemVariantOption.findMany(),
					this.prisma.category.findMany(),
					this.prisma.purchase.findMany(),
					this.prisma.sale.findMany(),
					this.prisma.provider.findMany(),
				]);
				const backup = yield (0, prisma_backup_1.runBackup)({
					models: {
						user: tables[0],
						employee: tables[1],
						item: tables[2],
						itemModifier: tables[3],
						itemModifierOption: tables[4],
						itemVariant: tables[5],
						itemVariantOption: tables[6],
						category: tables[7],
						purchase: tables[8],
						sale: tables[9],
						provider: tables[10],
					},
					backupFolderName: "backup-files",
				});
				return backup;
			} catch (error) {
				throw new Error(error);
			}
		});
	}
}
exports.PrismaBackupRepository = PrismaBackupRepository;
