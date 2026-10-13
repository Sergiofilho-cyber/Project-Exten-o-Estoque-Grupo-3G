import type { Cargo } from "./cargos";

// Tipos dos dados que o backend devolve para as telas.
export interface Perfil {
  id: string;
  nome: string;
  email: string;
  cargo: Cargo;
}

export interface DadosDeCadastro {
  nome: string;
  email: string;
  senha: string;
}
