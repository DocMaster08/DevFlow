import type { Request, Response } from "express";
import { registerSchema } from "../schemas/auth.schema.js";
import { registerUser } from "../services/auth.service.js";

export async function registerUserController(req:Request, res: Response){
    const data =  registerSchema.parse(req.body)

    const user = await registerUser(data);

    res.status(200).json(user)
}