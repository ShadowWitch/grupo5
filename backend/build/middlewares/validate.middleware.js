"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResources = void 0;
const validateResources = (schema) => (req, res, next) => {
	try {
		schema.parseAsync({
			body: req.body,
			query: req.query,
			params: req.params,
		});
		next();
	} catch (error) {
		next(error);
	}
};
exports.validateResources = validateResources;
// https://jeffsegovia.dev/blogs/rest-api-validation-using-zod
// https://dev.to/franciscomendes10866/schema-validation-with-zod-and-expressjs-111p
// https://www.npmjs.com/package/zod-express-middleware
