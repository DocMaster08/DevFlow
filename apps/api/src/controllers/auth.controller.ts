import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { loginUser, registerUser } from "../services/auth.service.js";

export async function registerUserController(req: Request, res: Response) {
    const data = registerSchema.parse(req.body)

    const user = await registerUser(data);

    res.status(201).json(user)
}

export async function loginUserController(req: Request, res: Response) {
    const data = loginSchema.parse(req.body)

    const result = await loginUser(data);

    res.status(200).json(result);
}

export async function getCurrentUserController(
    req: Request,
    res: Response
) {
    res.json({
        user: {
            id: req.user!.id,
            name: req.user!.name,
            email: req.user!.email,
        },
    });
}