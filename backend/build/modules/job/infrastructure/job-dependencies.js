"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const jobs_services_1 = require("../application/jobs-services");
const job_controller_1 = require("./http/controllers/job.controller");
const job_routes_1 = require("./http/routes/job.routes");
const prisma_job_repository_1 = require("./persistence/prisma-job-repository");
const jobRepository = new prisma_job_repository_1.PrismaJobRepository(
	prisma_1.prisma
);
const jobServices = new jobs_services_1.JobServices(jobRepository);
const jobController = new job_controller_1.JobController(jobServices);
const jobRouter = new job_routes_1.JobRouter(jobController);
const jobDependencies = {
	controller: jobController,
	services: jobServices,
	repository: jobRepository,
	router: jobRouter,
};
exports.default = jobDependencies;
