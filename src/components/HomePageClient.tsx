"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { ViewMode } from "./ViewMode";
import GridView from "./GridView";
import TypeFilter from "./TypeFilter";

import { getPokemons } from "@/services/api";

const HomePageClient = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [filterType, setFilterType] = useState("all");

  const { data: allPokemon } = useQuery({
    queryKey: ["pokemon-all"],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 5,
  });

  const filteredData = useMemo(() => {
    if (!allPokemon) return [];
    if (filterType === "all") return allPokemon;

    return allPokemon.filter((pokemon) =>
      pokemon.types.some((t) => t.type.name === filterType)
    );
  }, [allPokemon, filterType]);

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

      <div className="flex flex-col lg:flex-row justify-between items-baseline mb-4">
        <TypeFilter selectedType={filterType} onChange={setFilterType} />
        <ViewMode value={viewMode} onChange={setViewMode} />
      </div>

      {viewMode === "grid" ? <GridView data={filteredData} /> : <table></table>}
    </div>
  );
};

export default HomePageClient;
