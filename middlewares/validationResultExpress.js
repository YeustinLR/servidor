import { validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errrors = validationResult(req);

    if (!errrors.isEmpty()) {
        return res.status(400).json({ errrors: errrors.array() });
    }
    next();
};
