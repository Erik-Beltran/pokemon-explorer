"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ReactPaginate from "react-paginate";

import { ViewMode } from "./ViewMode";
import GridView from "./GridView";
import TypeFilter from "./TypeFilter";
import PokemonModal from "./PokemonModal";
import PokemonCardSkeleton from "./PokemonCardSkeleton";

import { getPokemons } from "@/services/api";
import { Pokemon } from "@/types/pokemon";
import { PokemonTable } from "./PokemonTable";

const PAGE_SIZE = 15;

const HomePageClient = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [filterType, setFilterType] = useState("all");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleOpenModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const {
    data: allPokemon,
    isLoading,
    isError,
    error,
  } = useQuery({
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

  const paginatedData = useMemo(() => {
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil((filteredData?.length || 0) / PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(0);
  }, [filterType]);

  return (
    <div className="lg:max-w-4xl lg:mx-auto w-full py-10 px-6 md:px-10 flex flex-col  relative">
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

      <div className="flex flex-col lg:flex-row justify-between items-baseline mb-8 max-md:gap-y-4">
        <TypeFilter selectedType={filterType} onChange={setFilterType} />
        <ViewMode value={viewMode} onChange={setViewMode} />
      </div>

      {isLoading && <PokemonCardSkeleton />}
      {isError && (
        <p className="text-red-600 text-center py-6">
          Something went wrong. Please try again {(error as Error).message}
        </p>
      )}

      {filteredData && filteredData.length > 0 && (
        <>
          {viewMode === "grid" ? (
            <GridView data={paginatedData} onSelectPokemon={handleOpenModal} />
          ) : (
            <PokemonTable
              data={paginatedData}
              onSelectPokemon={handleOpenModal}
            />
          )}
        </>
      )}

      {filteredData.length > PAGE_SIZE && (
        <ReactPaginate
          forcePage={currentPage}
          previousLabel="<"
          nextLabel=">"
          pageCount={totalPages}
          onPageChange={handlePageClick}
          containerClassName="flex items-center justify-center gap-4 rounded-md p-3 mt-4 flex-wrap"
          previousClassName="text-white bg-blue-400 hover:bg-red-500 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer"
          nextClassName="text-white  bg-blue-400 hover:bg-red-500 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer"
          activeClassName="text-blue-600 bg-yellow-500 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer"
          pageClassName="text-white bg-blue-400 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-red-500"
        />
      )}

      {isModalOpen && selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default HomePageClient;
