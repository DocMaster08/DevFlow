import z from "zod";

export const loginSchema = z.object(
    {
        email: z.email(),
        password: z.string().min(1)
    }
)

export type loginDTO = z.infer<typeof loginSchema>

export type LoginResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
};