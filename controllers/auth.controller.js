import { validationResult } from "express-validator";

export const register = async (req, res) => {
    console.log(req.body);
    res.json({ ok: "Register" });
};

export const login = async (req, res) => {
    res.json({ ok: "Login" });
};
