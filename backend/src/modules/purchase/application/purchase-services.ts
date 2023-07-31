import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { PurchaseRepository } from "../domain/purchase-repository";
import { Purchase } from "../domain/purchase.model";

export class PurchaseServices {
	constructor(private readonly purchaseRepository: PurchaseRepository) {}

	public async findServeral(options: Options): Promise<Purchase[]> {
		const where: object = {};

		const itemsFound = await this.purchaseRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Purchase> {
		const itemFound = await this.purchaseRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Purchase) {
		const itemCreated = await this.purchaseRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<Purchase>
	): Promise<Purchase> {
		const itemUpdated = await this.purchaseRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Purchase> {
		const itemDeleted = await this.purchaseRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.purchaseRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
