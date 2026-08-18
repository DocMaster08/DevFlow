import { prisma } from "../config/prisma.js";
import { ConflictError } from "../errors/ConflictError.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import type { LoginDTO, RegisterDTO } from "../schemas/auth.schema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export async function registerUser(data: RegisterDTO) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (existingUser) throw new ConflictError("User already exists")

    const passwordHash = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash: passwordHash
        }
    })

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    }
}

export async function loginUser(data: LoginDTO) {

    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if (!user) throw new UnauthorizedError("Invalid credentials")

    const passwordValid = await bcrypt.compare(
        data.password,
        user.passwordHash
    );

    if (!passwordValid) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign(
        {
            sub: user.id,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1h",
        }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token
    }



}