import Image from "next/image";

import { Pokemon } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <>
      <li
        key={pokemon.id}
        className=" bg-white shadow-md rounded-md hover:bg-gray-200 transition-all duration-300   list-none p-4 font-bold relative h-[150px] mb-8 flex flex-col lg:justify-between cursor-pointer"
      >
        <span>{"Nº " + pokemon.id}</span>
        <Image
          src={pokemon.avatar}
          width={150}
          height={150}
          alt={pokemon.name}
          className="absolute  -bottom-1/4 -right-[10%]   max-md:w-[120px]"
        />
        <span className="capitalize">{pokemon.name}</span>
      </li>
    </>
  );
};

export default PokemonCard;
