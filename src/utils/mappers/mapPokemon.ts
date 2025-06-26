import { PokeAPIPokemon } from "@/types/apiInterface";
import { Pokemon } from "@/types/pokemon";

export async function mapPokemonDetail(data: PokeAPIPokemon): Promise<Pokemon> {
  const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

  return {
    id: data.id,
    name: data.name,
    avatar: avatar,
    types: data.types,
    stats: data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    abilities: data.abilities.map((ability) => ability.ability.name),
    base_experience: data.base_experience,
    height: data.height,
    weight: data.weight,
  };
}
