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
  { id: "normal", label: "Normal" },
  { id: "fire", label: "Fire" },
  { id: "water", label: "Water" },
  { id: "electric", label: "Electric" },
  { id: "grass", label: "Grass" },
  { id: "ice", label: "Ice" },
  { id: "fighting", label: "Fighting" },
  { id: "poison", label: "Poison" },
  { id: "ground", label: "Ground" },
  { id: "flying", label: "Flying" },
  { id: "psychic", label: "Psychic" },
  { id: "bug", label: "Bug" },
  { id: "rock", label: "Rock" },
  { id: "ghost", label: "Ghost" },
  { id: "dragon", label: "Dragon" },
  { id: "dark", label: "Dark" },
  { id: "steel", label: "Steel" },
  { id: "fairy", label: "Fairy" },
] as const;
