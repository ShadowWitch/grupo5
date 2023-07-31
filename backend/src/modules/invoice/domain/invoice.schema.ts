import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";
import { Invoice } from "@prisma/client";

export const invoiceSchema = z
	.object({
		lote_id: z.string(),
		sale_id: z.string(),
		status: z.string(),
	})
	.merge(genericSchema.partial());

export const partialInvoiceSchema = invoiceSchema.partial();
