import { Card, CardContent } from "@/components/ui/card"
import LoginForm from "@/features/auth/components/LoginForm"
import { useLogin } from "@/features/auth/hooks/useLogin"
import type { LoginDTO } from "@/features/auth/schemas/loginSchema"

function LoginPage() {

  const loginMutation = useLogin()

  function handleSubmit(data: LoginDTO) {
    loginMutation.mutate(data)
  }

  return (
    <div className="flex h-dvh justify-center items-center">
      <Card className="w-md">
        <CardContent>
          <LoginForm onSubmit={handleSubmit} isSubmitting={loginMutation.isPending} />
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage