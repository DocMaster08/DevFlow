import { useForm } from "react-hook-form";
import { loginSchema, type LoginDTO } from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import InputField from "@/components/common/InputField";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface LoginFormProps {
  onSubmit: (data: LoginDTO) => void
  isSubmitting: boolean
}

function LoginForm({ onSubmit, isSubmitting }: LoginFormProps) {
  const form = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend>Login</FieldLegend>
        <FieldDescription>Login to access features</FieldDescription>
        <FieldGroup className="">
          <InputField form={form} name="email" label="Email" placeholder="doc.lag@gmail.com" type="email" />
          <InputField form={form} name="password" label="Password" placeholder="••••••••" type="password" />

          <Button type="submit" disabled={isSubmitting}>
            {
              isSubmitting
                ? <><Spinner /> Loggin in...</>
                : "Login"
            }
          </Button>

        </FieldGroup>
      </FieldSet>
    </form>
  )
}

export default LoginForm