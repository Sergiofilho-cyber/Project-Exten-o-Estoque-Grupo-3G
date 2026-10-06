"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Menu, X, LogOut } from "lucide-react";
import { supabaseClient as supabase } from "@/lib/supabase-client";

// Atalhos rápidos exibidos sempre na barra inferior.
// Os itens de cada perfil entram na tarefa T2.5 e nas etapas seguintes.
const ABAS_RAPIDAS = [{ href: "/", label: "Início", icon: LayoutDashboard }];

// Menu completo, aberto pelo botão "Menu". Também é o caminho para sair da
// conta em páginas que não têm cabeçalho próprio.
const ITENS_MENU = [{ href: "/", label: "Início", icon: LayoutDashboard }];

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);

  // Trava o scroll do fundo enquanto o menu está aberto.
  useEffect(() => {
    if (!menuAberto) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuAberto]);

  // Não exibe a barra no login
  if (pathname === "/login") return null;

  const isAtivo = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const handleSair = async () => {
    setMenuAberto(false);
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      {/* Overlay + bottom sheet do menu completo */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-200 ${
          menuAberto ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuAberto}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMenuAberto(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out pb-[max(0.75rem,env(safe-area-inset-bottom))] ${
            menuAberto ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
            <h2 className="font-black text-gray-800 text-lg">Menu</h2>
            <button
              onClick={() => setMenuAberto(false)}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 active:bg-gray-100 rounded-full transition min-w-[40px] min-h-[40px]"
              aria-label="Fechar menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="p-3">
            {ITENS_MENU.map((item) => {
              const Icon = item.icon;
              const ativo = isAtivo(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuAberto(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-colors min-h-[48px] ${
                    ativo
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 active:bg-gray-100"
                  }`}
                >
                  <Icon size={20} className={ativo ? "text-indigo-600" : "text-gray-400"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 pb-3 pt-1 border-t border-gray-100">
            <button
              onClick={handleSair}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-red-600 active:bg-red-50 transition-colors min-h-[48px]"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Barra de atalhos rápidos */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-1 py-1.5 shadow-lg flex justify-around items-center">
        {ABAS_RAPIDAS.map((link) => {
          const Icon = link.icon;
          const ativo = isAtivo(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[56px] min-h-[48px] ${
                ativo
                  ? "text-indigo-600 bg-indigo-50 font-bold"
                  : "text-gray-500 hover:text-indigo-500 active:bg-gray-100"
              }`}
            >
              <Icon size={20} className={ativo ? "text-indigo-600" : "text-gray-500"} />
              <span className="text-[9px] mt-0.5 leading-none">{link.label}</span>
            </Link>
          );
        })}

        <button
          onClick={() => setMenuAberto(true)}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[56px] min-h-[48px] text-gray-500 hover:text-indigo-500 active:bg-gray-100"
          aria-label="Abrir menu completo"
        >
          <Menu size={20} className="text-gray-500" />
          <span className="text-[9px] mt-0.5 leading-none">Menu</span>
        </button>
      </nav>
    </>
  );
}
