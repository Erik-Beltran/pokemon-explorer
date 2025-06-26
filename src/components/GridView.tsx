import PokemonCard from "./PokemonCard";
import { Pokemon } from "@/types/pokemon";

interface GridViewProps {
  data: Pokemon[];
  onSelectPokemon: (pokemon: Pokemon) => void;
}
const GridView = ({ data, onSelectPokemon }: GridViewProps) => {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {data.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          onSelectPokemon={() => onSelectPokemon(pokemon)}
        ></PokemonCard>
      ))}
    </ul>
  );
};

export default GridView;
