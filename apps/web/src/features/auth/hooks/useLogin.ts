import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import { toast } from "sonner";

export function useLogin() {
    return useMutation({
        mutationFn: login,

        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
        },

        onError: (error) => {
            toast.error("Error Logging in")
        }
    });
}