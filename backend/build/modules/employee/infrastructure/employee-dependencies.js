"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const employee_services_1 = require("../application/employee-services");
const employee_controller_1 = require("./http/controllers/employee.controller");
const employee_routes_1 = require("./http/routes/employee.routes");
const prisma_employee_repository_1 = require("./persistence/prisma-employee-repository");
const employeeRepository =
	new prisma_employee_repository_1.PrismaEmployeeRepository(prisma_1.prisma);
const employeeServices = new employee_services_1.EmployeeServices(
	employeeRepository
);
const employeeController = new employee_controller_1.EmployeeController(
	employeeServices
);
const employeeRouter = new employee_routes_1.EmployeeRouter(employeeController);
const employeeDependencies = {
	controller: employeeController,
	services: employeeServices,
	repository: employeeRepository,
	router: employeeRouter,
};
exports.default = employeeDependencies;
