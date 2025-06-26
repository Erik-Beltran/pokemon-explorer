import axiosInstance from "./axiosInstance";
import { mapPokemonDetail } from "@/utils/mappers/mapPokemon";
import { Pokemon } from "@/types/pokemon";
import { PokeAPIPaginatedResponse, PokeAPIPokemon } from "@/types/apiInterface";

const TOTAL_POKEMON = 151;

export const getPokemons = async (): Promise<Pokemon[]> => {
  try {
    const { data } = await axiosInstance.get<PokeAPIPaginatedResponse>(
      `/pokemon`,
      {
        params: { offset: 0, limit: TOTAL_POKEMON },
      }
    );

    const detailedResults = await Promise.all(
      data.results.map(async (info) => {
        const res = await axiosInstance.get<PokeAPIPokemon>(info.url);
        return mapPokemonDetail(res.data);
      })
    );

    return detailedResults;
  } catch (error) {
    console.error("Error getting Pokemon", error);
    throw new Error("Error getting Pokemons");
  }
};
