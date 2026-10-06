"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, Package } from "lucide-react";
import { supabaseClient as supabase } from "@/lib/supabase-client";

// Página inicial provisória. O painel com totais é a tarefa T6.5
// (docs/03-specifications/etapa-6-consulta.md).
export default function InicioPage() {
  const router = useRouter();
  const [saindo, setSaindo] = useState(false);

  const handleSair = async () => {
    setSaindo(true);
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Package className="text-white" size={20} />
            </div>
            <span className="font-bold text-gray-800 text-lg">Estoque 3G</span>
          </div>
          <button
            onClick={handleSair}
            disabled={saindo}
            className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 min-h-[40px] disabled:opacity-50"
          >
            {saindo ? <Loader2 className="animate-spin" size={16} /> : <LogOut size={16} />}
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full p-4 md:p-8">
        <h1 className="text-2xl font-extrabold text-gray-800">Início</h1>
        <p className="text-gray-600 mt-2">
          As telas do sistema serão adicionadas a cada etapa do roteiro.
        </p>
      </main>
    </div>
  );
}
