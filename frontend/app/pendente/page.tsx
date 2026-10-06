"use client";

import { useEffect, useState } from "react";
import { supabaseClient as supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import {
  Clock,
  LogOut,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function PendentePage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<{
    nome: string;
    email: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isCheckingApproval, setIsCheckingApproval] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: userData, error } = await supabase
          .from("perfis")
          .select("nome, email, cargo")
          .eq("id", user.id)
          .single();

        // Se o usuário foi deletado do banco, fazer logout
        if (error || !userData) {
          console.warn(
            "Usuário não encontrado na tabela perfis, fazendo logout...",
          );
          await supabase.auth.signOut();
          router.push("/login");
          setIsLoading(false);
          return;
        }

        if (userData) {
          setUsuario({ nome: userData.nome, email: userData.email });

          // Só cargos com acesso ao estoque (admin/estoque) entram no app.
          // "vendedor" e demais cargos permanecem nesta tela.
          if (
            userData.cargo &&
            ["estoque", "admin"].includes(userData.cargo)
          ) {
            router.push("/");
          }
        }
      } else {
        // Se não estiver logado, redirecionar para login
        router.push("/login");
      }

      setIsLoading(false);
    }

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setIsLoggingOut(false);
    }
  };

  const handleCheckApproval = async () => {
    setIsCheckingApproval(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: userData } = await supabase
        .from("perfis")
        .select("cargo")
        .eq("id", user.id)
        .single();

      if (
        userData &&
        userData.cargo &&
        ["estoque", "admin"].includes(userData.cargo)
      ) {
        // Usuário foi aprovado, redirecionar para home
        router.push("/");
      }
    }

    setIsCheckingApproval(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* CABEÇALHO */}
        <div className="bg-linear-to-r from-amber-500 to-orange-500 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Clock size={32} />
          </div>
          <h1 className="text-2xl font-bold">Conta Pendente</h1>
          <p className="text-amber-100 text-sm mt-1">
            Sua aprovação está sendo processada
          </p>
        </div>

        {/* CONTEÚDO */}
        <div className="p-8 space-y-6">
          {/* ALERTA */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md">
            <div className="flex gap-3">
              <AlertCircle className="text-amber-600 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-amber-900 text-sm">
                  Conta aguardando aprovação
                </p>
                <p className="text-amber-700 text-xs mt-1">
                  Seu acesso ao sistema será liberado após a aprovação do
                  administrador.
                </p>
              </div>
            </div>
          </div>

          {/* INFORMAÇÕES DO USUÁRIO */}
          {usuario && (
            <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-200">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">
                  Nome
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {usuario.nome}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">
                  E-mail
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {usuario.email}
                </p>
              </div>
            </div>
          )}

          {/* PRÓXIMOS PASSOS */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 text-sm">
              O que fazer agora?
            </h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="shrink-0 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Aguarde o administrador revisar sua solicitação</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Você receberá notificação quando for aprovado</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Faça login novamente para acessar o sistema</span>
              </li>
            </ol>
          </div>

          {/* INFORMAÇÃO ADICIONAL */}
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
            <p className="text-xs text-indigo-800">
              💡 <span className="font-semibold">Dica:</span> Clique no botão
              abaixo para verificar se sua conta já foi aprovada.
            </p>
          </div>

          {/* BOTÕES */}
          <div className="space-y-3">
            <button
              onClick={handleCheckApproval}
              disabled={isCheckingApproval}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:transform active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isCheckingApproval ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Verificando...
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  Verificar Aprovação
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoggingOut ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <LogOut size={18} />
              )}
              Sair da Conta
            </button>
          </div>

          {/* CONTATO */}
          <div className="text-center pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Dúvidas? Entre em contato com o administrador do sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
