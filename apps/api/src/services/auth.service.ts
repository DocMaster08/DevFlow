import { prisma } from "../config/prisma.js";
import { ConflictError } from "../errors/ConflictError.js";
import type { RegisterDTO } from "../schemas/auth.schema.js";
import bcrypt from "bcrypt"

export async function registerUser(data:RegisterDTO){
    const existingUser = await prisma.user.findUnique({
        where: {
            email:data.email
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