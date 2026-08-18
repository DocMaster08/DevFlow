import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import jwt from "jsonwebtoken"
import { prisma } from "../config/prisma.js";

interface AuthTokenPayload extends jwt.JwtPayload {
    sub: string;
}

export async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedError("Authentication required");

    const [scheme, token] = authHeader.split(" ")

    if (scheme !== "Bearer" || !token) throw new UnauthorizedError("Invalid authorization header")

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthTokenPayload;

        if (!payload.sub) throw new UnauthorizedError("Invalid token")

        const user = await prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
        });

        if (!user) throw new UnauthorizedError("User no longer exists")

        req.user = { id: user.id }

        next();

    } catch {
        throw new UnauthorizedError("Invalid token")
    }

}