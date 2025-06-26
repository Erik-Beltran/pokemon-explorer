"use client";

import { getPokemons } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const HomePageClient = () => {
  const { data: allPokemon } = useQuery({
    queryKey: ["pokemon-all"],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div>
      <ul className="flex gap-2 flex-wrap">
        {allPokemon?.map((pokemon) => (
          <span key={pokemon.name}>{pokemon.name}</span>
        ))}
      </ul>
    </div>
  );
};

export default HomePageClient;
