import { prisma } from "../config/prisma.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export async function getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    if (!user) throw new NotFoundError("User not found");

    return user;
}