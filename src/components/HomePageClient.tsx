"use client";

import { useQuery } from "@tanstack/react-query";

import PokemonCard from "./PokemonCard";
import { getPokemons } from "@/services/api";

const HomePageClient = () => {
  const { data: allPokemon } = useQuery({
    queryKey: ["pokemon-all"],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div className="lg:max-w-4xl lg:mx-auto w-full pt-10 px-6 md:px-10">
      <h1 className="font-bold text-6xl mb-8 text-center">Pokémon Explorer</h1>
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {allPokemon?.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon}></PokemonCard>
        ))}
      </ul>
    </div>
  );
};

export default HomePageClient;
