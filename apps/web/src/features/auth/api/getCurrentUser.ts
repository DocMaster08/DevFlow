import { api } from "@/lib/axios";
import type { User } from "@/types/user";

export async function getCurrentUser(){
    const response = await api.get<User>("/auth/me")
    return response.data
}