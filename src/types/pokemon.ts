import { Type } from "./apiInterface";

export interface Pokemon {
  id: number;
  name: string;
  types: Type[];
  avatar: string;
  stats: Stat[];
  abilities: string[];
  weight: number;
  height: number;
  base_experience: number;
}

export interface Stat {
  name: string;
  value: number;
}

export const POKEMON_TYPES = [
  { id: "normal", label: "Normal", color: "#A8A77A" },
  { id: "fire", label: "Fire", color: "#EE8130" },
  { id: "water", label: "Water", color: "#6390F0" },
  { id: "electric", label: "Electric", color: "#F7D02C" },
  { id: "grass", label: "Grass", color: "#7AC74C" },
  { id: "ice", label: "Ice", color: "#96D9D6" },
  { id: "fighting", label: "Fighting", color: "#C22E28" },
  { id: "poison", label: "Poison", color: "#A33EA1" },
  { id: "ground", label: "Ground", color: "#E2BF65" },
  { id: "flying", label: "Flying", color: "#A98FF3" },
  { id: "psychic", label: "Psychic", color: "#F95587" },
  { id: "bug", label: "Bug", color: "#A6B91A" },
  { id: "rock", label: "Rock", color: "#B6A136" },
  { id: "ghost", label: "Ghost", color: "#735797" },
  { id: "dragon", label: "Dragon", color: "#6F35FC" },
  { id: "dark", label: "Dark", color: "#705746" },
  { id: "steel", label: "Steel", color: "#B7B7CE" },
  { id: "fairy", label: "Fairy", color: "#D685AD" },
] as const;

export type PokemonTypeInfo = (typeof POKEMON_TYPES)[number];
export type PokemonType = PokemonTypeInfo["id"];
