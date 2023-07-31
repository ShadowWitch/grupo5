"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const job_schema_1 = require("../../../domain/job.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class JobRouter {
	constructor(jobController) {
		this.jobController = jobController;
		this.path = "/jobs";
		this.router = (0, express_1.Router)();
		this.initializeRoutes();
	}
	initializeRoutes() {
		this.router.get(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.jobController.getSeveral.bind(this.jobController)
		);
		this.router.get(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				job_schema_1.jobSchema.pick({ id: true })
			),
			this.jobController.getOne.bind(this.jobController)
		);
		this.router.post(
			this.path,
			(0, zod_express_middleware_1.validateRequestBody)(
				job_schema_1.jobSchema
			),
			this.jobController.createOne.bind(this.jobController)
		);
		this.router.put(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequest)({
				params: job_schema_1.jobSchema.pick({ id: true }),
				body: job_schema_1.partialJobSchema,
			}),
			this.jobController.updateOneById.bind(this.jobController)
		);
		this.router.delete(
			this.path + "/:id",
			authenticate_middleware_1.isAuthenticated,
			(0, zod_express_middleware_1.validateRequestParams)(
				job_schema_1.jobSchema.pick({ id: true })
			),
			this.jobController.deleteOneById.bind(this.jobController)
		);
		this.router.delete(
			this.path,
			authenticate_middleware_1.isAuthenticated,
			this.jobController.deleteSeveral.bind(this.jobController)
		);
	}
}
exports.JobRouter = JobRouter;
