"use client";

import { Suspense, useState, useEffect } from "react";
import { supabaseClient as supabase } from "@/lib/supabase-client";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  LogIn,
  Loader2,
  Package,
  UserPlus,
  User,
} from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register fields
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setError(decodeURIComponent(message));
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      if (data.session) {
        // Validar se o perfil existe na tabela
        const { data: perfilData, error: perfilError } = await supabase
          .from("perfis")
          .select("id")
          .eq("id", data.user.id)
          .single();

        if (perfilError || !perfilData) {
          // Perfil não existe, fazer logout e mostrar erro
          await supabase.auth.signOut();
          throw new Error(
            "Usuário não encontrado no sistema. Entre em contato com o administrador.",
          );
        }

        // Força um recarregamento completo para o Middleware ler o cookie novo
        window.location.href = "/";
      }
    } catch (err: unknown) {
      console.error("Erro no login:", err);
      setError(err instanceof Error ? err.message : "E-mail ou senha incorretos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validar que o nome não está vazio antes de tentar criar a conta
      if (!registerName || registerName.trim() === "") {
        throw new Error("Por favor, insira seu nome completo");
      }

      // Criar usuário na autenticação
      let authData;
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: registerEmail,
          password: registerPassword,
          options: {
            data: {
              nome: registerName.trim(),
            },
          },
        });

      // Se o usuário já está registrado, tenta fazer login
      if (
        signUpError &&
        signUpError.message.includes("User already registered")
      ) {
        const { data: loginData, error: loginError } =
          await supabase.auth.signInWithPassword({
            email: registerEmail,
            password: registerPassword,
          });

        if (loginError) {
          throw new Error(
            "Este email já foi registrado. Faça login com suas credenciais.",
          );
        }

        authData = loginData;
      } else if (signUpError) {
        throw signUpError;
      } else {
        authData = signUpData;
      }

      if (!authData.user) {
        throw new Error("Falha ao criar usuário");
      }

      // O perfil (cargo "pendente") é criado pelo próprio banco, no gatilho
      // ao_criar_usuario, usando o nome enviado em options.data.
      setSuccess(
        "Conta criada com sucesso! Aguarde a aprovação do administrador para acessar o sistema.",
      );

      // Limpar formulário
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterName("");

      // Voltar para login após 3 segundos
      setTimeout(() => {
        setIsLoginMode(true);
        setSuccess(null);
      }, 3000);
    } catch (err: unknown) {
      console.error("Erro no registro:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao criar a conta. Tente novamente ou entre em contato com o administrador.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* CABEÇALHO DO LOGIN */}
        <div className="bg-indigo-600 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Package size={32} />
          </div>
          <h1 className="text-2xl font-bold">Estoque 3G</h1>
          <p className="text-indigo-100 text-sm mt-1">
            Catalogação e endereçamento de estoque
          </p>
        </div>

        {/* ABAS */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setIsLoginMode(true);
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 py-4 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              isLoginMode
                ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}>
            <LogIn size={18} />
            Entrar
          </button>
          <button
            onClick={() => {
              setIsLoginMode(false);
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 py-4 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              !isLoginMode
                ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}>
            <UserPlus size={18} />
            Criar Conta
          </button>
        </div>

        {/* FORMULÁRIO DE LOGIN */}
        {isLoginMode ? (
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded-md animate-pulse">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                E-mail Corporativo
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Senha
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:transform active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <LogIn size={20} />
                  Entrar no Estoque
                </>
              )}
            </button>
          </form>
        ) : (
          /* FORMULÁRIO DE REGISTRO */
          <form onSubmit={handleRegister} className="p-8 space-y-4">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded-md animate-pulse">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 text-green-700 text-sm rounded-md animate-pulse">
                {success}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Nome Completo
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-800"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                E-mail
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-800"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Senha
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-800"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 active:transform active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <UserPlus size={20} />
                  Criar Conta
                </>
              )}
            </button>
            <div className="text-center pt-2 mt-2">
              <p className="text-xs text-gray-500">
                Após criar sua conta, aguarde a aprovação do administrador.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginEstoque() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>}>
      <LoginForm />
    </Suspense>
  );
}
