"use client";

import { useQuery } from "@tanstack/react-query";

import { getPokemons } from "@/services/api";
import Image from "next/image";
import { useState } from "react";
import { ViewMode } from "./ViewMode";
import GridView from "./GridView";

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

      {viewMode === "grid" ? <GridView data={allPokemon} /> : <table></table>}
    </div>
  );
};

export default HomePageClient;
