import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { resetPasswordSchema, type ResetPasswordData } from "@shared/schema";
import { AnimatedLogo } from "@/components/animated-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [token, setToken] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Extrair token da URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      // Se não há token, redireciona para login
      setLocation('/login');
    }
  }, [setLocation]);

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Verificar se o token é válido
  const { data: tokenVerification, isLoading: isVerifyingToken, error: tokenError } = useQuery({
    queryKey: [`/api/auth/verify-reset-token/${token}`],
    enabled: !!token,
    retry: false,
  });

  // Mutation para reset de senha
  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const res = await apiRequest('POST', '/api/auth/reset-password', data);
      return await res.json();
    },
    onSuccess: () => {
      setResetSuccess(true);
      toast({
        title: "Senha redefinida com sucesso!",
        description: "Sua nova senha foi salva. Você pode fazer login agora.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao redefinir senha",
        description: error.message || "Erro interno do servidor",
        variant: "destructive",
      });
    },
  });

  // Atualizar o token no form quando ele for obtido da URL
  useEffect(() => {
    if (token) {
      form.setValue('token', token);
    }
  }, [token, form]);

  const onSubmit = (data: ResetPasswordData) => {
    resetPasswordMutation.mutate(data);
  };

  const handleGoToLogin = () => {
    setLocation('/login');
  };

  // Se ainda está carregando a verificação do token
  if (isVerifyingToken) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <AnimatedLogo size="lg" showPulse className="mb-4" />
          <div className="text-white">
            <p>Verificando token...</p>
          </div>
        </div>
      </div>
    );
  }

  // Se o token é inválido ou expirado
  if (tokenError || !(tokenVerification as any)?.valid) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <AnimatedLogo size="lg" showPulse className="mb-4" />
            <h1 className="text-3xl font-bold text-white">SimpleDFe</h1>
          </div>

          <Card className="glassmorphism border-white/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
                <h2 className="text-xl font-semibold text-white">
                  Token Inválido ou Expirado
                </h2>
                <p className="text-gray-300">
                  O link para redefinição de senha é inválido ou já expirou. 
                  Por favor, solicite um novo link de redefinição.
                </p>
                <Button
                  onClick={handleGoToLogin}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                >
                  Voltar ao Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Se a senha foi redefinida com sucesso
  if (resetSuccess) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <AnimatedLogo size="lg" showPulse className="mb-4" />
            <h1 className="text-3xl font-bold text-white">SimpleDFe</h1>
          </div>

          <Card className="glassmorphism border-white/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                <h2 className="text-xl font-semibold text-white">
                  Senha Redefinida com Sucesso!
                </h2>
                <p className="text-gray-300">
                  Sua nova senha foi salva com segurança. Agora você pode fazer login com sua nova senha.
                </p>
                <Button
                  onClick={handleGoToLogin}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                >
                  Fazer Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <AnimatedLogo size="lg" showPulse className="mb-4" />
          <h1 className="text-3xl font-bold text-white">SimpleDFe</h1>
          <p className="text-gray-300 mt-2">Redefinir Senha</p>
        </div>

        {/* Reset Password Form */}
        <Card className="glassmorphism border-white/20">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white text-center mb-2">
                  🔐 Nova Senha
                </h2>
                <p className="text-gray-300 text-center text-sm">
                  Olá, {(tokenVerification as any)?.name}! Digite sua nova senha abaixo.
                </p>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <Label htmlFor="password" className="text-gray-200">
                    Nova Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua nova senha"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                      {...form.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-200">
                    Confirmar Nova Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirme sua nova senha"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                      {...form.register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {form.formState.errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="bg-yellow-100/10 border border-yellow-400/20 rounded-lg p-3">
                  <p className="text-yellow-200 text-sm">
                    ⚠️ Sua senha deve ter pelo menos 8 caracteres para garantir a segurança da sua conta.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={resetPasswordMutation.isPending}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  {resetPasswordMutation.isPending ? "Redefinindo..." : "Redefinir Senha"}
                </Button>
              </form>

              <div className="text-center">
                <button
                  onClick={handleGoToLogin}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Voltar ao login
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}