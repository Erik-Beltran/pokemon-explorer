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
