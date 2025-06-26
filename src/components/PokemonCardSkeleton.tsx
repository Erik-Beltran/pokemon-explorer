const PokemonCardSkeleton = () => {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10  ">
      {Array.from({ length: 6 }).map((_, id) => (
        <li
          key={id}
          className="shadow-sm rounded-md h-[150px] bg-gray-300 animate-pulse"
        ></li>
      ))}
    </ul>
  );
};

export default PokemonCardSkeleton;
