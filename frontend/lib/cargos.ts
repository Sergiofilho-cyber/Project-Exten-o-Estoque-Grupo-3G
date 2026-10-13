// Cargos e grupos de permissão, iguais aos do banco
// (docs/06-security/security-model.md).
//
// Estas funções servem para a tela decidir o que mostrar. A proteção de
// verdade está no banco: esconder um botão é conforto, não segurança.
export const CARGOS = [
  "pendente",
  "estoquista",
  "gerente",
  "gerente_estoque",
  "admin",
] as const;

export type Cargo = (typeof CARGOS)[number];

const CARGOS_QUE_CONSULTAM: readonly Cargo[] = [
  "estoquista",
  "gerente",
  "gerente_estoque",
  "admin",
];

const CARGOS_QUE_OPERAM: readonly Cargo[] = ["gerente_estoque", "admin"];

export function podeConsultar(cargo: Cargo): boolean {
  return CARGOS_QUE_CONSULTAM.includes(cargo);
}

export function podeOperar(cargo: Cargo): boolean {
  return CARGOS_QUE_OPERAM.includes(cargo);
}

export function eAdmin(cargo: Cargo): boolean {
  return cargo === "admin";
}

export function eCargo(valor: unknown): valor is Cargo {
  return typeof valor === "string" && CARGOS.includes(valor as Cargo);
}
