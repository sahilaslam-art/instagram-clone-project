import { sendResponse } from '../utils/response.util.js';

export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (err) {
        if (err.name === 'ZodError' || err.errors) {
            const errors = err.errors ? err.errors.map((e) => e.message) : err.issues.map((e) => e.message);
            return sendResponse(res, 400, false, "Validation failed", errors);
        }
        next(err);
    }
};
