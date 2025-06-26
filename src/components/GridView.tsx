import React from "react";
import PokemonCard from "./PokemonCard";
import { Pokemon } from "@/types/pokemon";

interface GridViewProps {
  data: Pokemon[] | undefined;
}
const GridView = ({ data }: GridViewProps) => {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {data?.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon}></PokemonCard>
      ))}
    </ul>
  );
};

export default GridView;
