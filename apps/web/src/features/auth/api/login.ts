import { api } from "@/lib/axios";
import type { LoginResponse, LoginDTO } from "../schemas/loginSchema";

export async function login(data: LoginDTO): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", data)
    return response.data
}