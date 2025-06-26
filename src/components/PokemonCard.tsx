import { useEffect, useState } from "react";
import Image from "next/image";

import { Pokemon } from "@/types/pokemon";
import { getDominantColor } from "@/utils/getDominantColor";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { avatar } = pokemon;
  const [bgColor, setBgColor] = useState<string>("rgb(240, 240, 240)");

  useEffect(() => {
    getDominantColor(avatar).then((color) => {
      if (color) setBgColor(color);
    });
  }, [avatar]);

  return (
    <>
      <li
        key={pokemon.id}
        className="shadow-md rounded-md hover:bg-gray-200 transition-all duration-300 p-4 font-bold relative h-[150px] mb-8 flex flex-col lg:justify-between cursor-pointer text-white"
        style={{ backgroundColor: bgColor }}
      >
        <Image
          src="/pokeball-light.webp"
          width={80}
          height={80}
          alt="pokeball"
          className=" absolute top-0 -right-0 opacity-[0.4] "
        />
        <span>{"Nº " + pokemon.id}</span>
        <Image
          src={pokemon.avatar}
          width={150}
          height={150}
          alt={pokemon.name}
          className="absolute -bottom-1/4 -right-[10%]   max-md:w-[120px]"
        />
        <span className="capitalize">{pokemon.name}</span>
      </li>
    </>
  );
};

export default PokemonCard;
