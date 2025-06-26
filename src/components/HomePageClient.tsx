"use client";

import { useQuery } from "@tanstack/react-query";

import PokemonCard from "./PokemonCard";
import { getPokemons } from "@/services/api";
import Image from "next/image";
import { useState } from "react";
import { ViewMode } from "./ViewMode";

const HomePageClient = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const { data: allPokemon } = useQuery({
    queryKey: ["pokemon-all"],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div className="lg:max-w-4xl lg:mx-auto w-full pt-10 px-6 md:px-10 flex flex-col  relative  max-md:overflow-hidden ">
      <Image
        src="/pokemon_logo.svg"
        width={500}
        height={150}
        alt="pokemon logo"
        className="mx-auto mb-4 border  "
      />

      <Image
        src="/pokeball-dark.webp"
        width={400}
        height={400}
        alt="pokeo"
        className="hidden lg:block absolute  opacity-50   -right-1/2 -top-30"
      />

      <ViewMode value={viewMode} onChange={setViewMode} />

      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {allPokemon?.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon}></PokemonCard>
        ))}
      </ul>
    </div>
  );
};

export default HomePageClient;
