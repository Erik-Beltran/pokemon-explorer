import { POKEMON_TYPES, PokemonType } from "@/types/pokemon";

export function getTypeColor(type: PokemonType): string {
  const found = POKEMON_TYPES.find((t) => t.id === type);
  return found?.color ?? "#777";
}
