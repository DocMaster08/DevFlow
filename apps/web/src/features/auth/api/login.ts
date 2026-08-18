import { api } from "@/lib/axios";
import type { LoginResponse, loginDTO } from "../schemas/loginSchema";

export async function login(data: loginDTO): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", data)
    return response.data
}