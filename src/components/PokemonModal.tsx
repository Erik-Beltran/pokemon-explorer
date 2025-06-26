"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import StatItem from "./StatItem";

import { Type } from "@/types/apiInterface";
import { Pokemon, PokemonType, Stat } from "@/types/pokemon";

import { formatHeight, formatWeight } from "@/utils/formatters";
import { getDominantColor } from "@/utils/getDominantColor";
import { getTypeColor } from "@/utils/getTypeColor";

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonModal = ({ onClose, pokemon }: PokemonModalProps) => {
  const { avatar } = pokemon;
  const [bgColor, setBgColor] = useState<string>("rgb(240, 240, 240)");

  useEffect(() => {
    getDominantColor(avatar).then((color) => {
      if (color) setBgColor(color);
    });
  }, [avatar]);

  useEffect(() => {
    getDominantColor(avatar).then((color) => {
      if (color) setBgColor(color);
    });
  }, [avatar]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/85  flex justify-center z-10 items-center">
      <div className="relative w-11/12 lg:max-w-lg  bg-white shadow-lg h-3/4 lg:h-2/3 transition-all duration-200 rounded-4xl">
        <Image
          src="/pokeball-light.webp"
          width={80}
          height={80}
          alt="pokeball"
          className="absolute left-0 z-10 opacity-[0.4]"
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-6 z-20 cursor-pointer"
        >
          <X className="w-6 h-6 text-white font-bold" />
        </button>

        <div
          className="relative flex flex-col h-full w-full items-center pt-32 lg:pt-24 rounded-4xl"
          style={{ backgroundColor: bgColor }}
        >
          <Image
            src={pokemon.avatar}
            width={200}
            height={200}
            alt={pokemon.name}
            className="absolute  -top-1/6   flex mx-auto z-20  "
          />
          <p className="text-sm   mb-1 text-white">{"Nº " + pokemon.id}</p>
          <h2 className="text-2xl font-bold capitalize mb-2 text-white">
            {pokemon.name}
          </h2>

          <div className="  flex flex-col flex-1 w-full items-center overflow-y-auto p-6 bg-white rounded-4xl">
            <h3 className="text-lg font-bold  mb-2">Types</h3>
            <ul className="flex gap-8 flex-wrap mb-8 w-full">
              {pokemon.types &&
                pokemon.types.map((type: Type, index: number) => {
                  const typeBgColor = getTypeColor(
                    type.type.name as PokemonType
                  );

                  return (
                    <li key={index} className="flex flex-1">
                      <StatItem value={type.type.name} bgColor={typeBgColor} />
                    </li>
                  );
                })}
            </ul>
            <>
              <h3 className="text-lg font-bold  mb-2">Abilities</h3>
              <ul className="flex  gap-8 flex-wrap mb-8 w-full">
                {pokemon.abilities.map((hability: string, index: number) => (
                  <li key={index} className="flex flex-1">
                    <StatItem value={hability} />
                  </li>
                ))}
              </ul>
            </>

            <div className="grid grid-cols-2 gap-4 mb-8 w-full">
              <StatItem label="HEIGTH" value={formatHeight(pokemon.height)} />
              <StatItem label="WEIGTH" value={formatWeight(pokemon.weight)} />
              <StatItem label="BASE EXP" value={pokemon.base_experience} />
            </div>

            <>
              <h3 className="text-lg font-bold  mb-2">Stats</h3>
              <ul className="mb-8 w-full ">
                {pokemon.stats.map((stat: Stat, index: number) => (
                  <div key={index} className="grid grid-cols-2 gap-6  mb-2">
                    <div className="flex justify-between items-center  gap-2">
                      <span className="capitalize text-left text-sm">
                        {stat.name}
                      </span>
                      <span className="text-sm">{stat.value}</span>
                    </div>
                    <meter
                      className="w-full rounded-full "
                      value={stat.value}
                      min={0}
                      low={49}
                      high={100}
                      optimum={200}
                      max={200}
                    />
                  </div>
                ))}
              </ul>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
