import { NextFunction, Request, Response } from "express";

import { Sale } from "../../../domain/sale.model";
import { SaleServices } from "../../../application/sale-services";

export class SaleController {
	constructor(private readonly saleService: SaleServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, today } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedToday = today ? today === "true" : false;

		try {
			const salesList = await this.saleService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					...(parsedToday && {
						created_at: {
							gte: new Date(
								new Date().getTime() - 1000 * 60 * 60 * 24 * 7
							),
							lte: new Date(),
						},
					}),
				},
			});

			const response = {
				data: salesList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: salesList.length,
			};

			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const saleFound = await this.saleService.findById(id);
			return res.status(200).json(saleFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const saleData: Sale = req.body;

		try {
			const saleCreated = await this.saleService.createOne(saleData);

			const httpResponse = {
				data: saleCreated,
				message: "Created",
			};
			res.status(201).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async updateOneById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id } = req.params;
		const saleData: Sale = req.body;

		try {
			const saleUpdated = await this.saleService.updateById(id, saleData);

			const httpResponse = {
				data: saleUpdated,
				message: "Updated",
			};
			return res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async deleteOneById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id } = req.params;

		try {
			const saleDeleted = await this.saleService.deleteById(id);

			const httpResponse = {
				data: saleDeleted,
				message: "Deleted",
			};
			return res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async deleteSeveral(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { ids } = req.body;
		const salesDeleted = await this.saleService.deleteMany(ids);

		try {
			return res.status(200).json(salesDeleted);
		} catch (error) {
			next(error);
		}
	}
}
