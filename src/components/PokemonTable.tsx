"use client";

import { useMemo } from "react";
import Image from "next/image";
import { ArrowDownUp, MoveDown, MoveUp } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Pokemon, PokemonType } from "@/types/pokemon";

import { formatHeight, formatWeight } from "@/utils/formatters";
import { getTypeColor } from "@/utils/getTypeColor";

type Props = {
  data: Pokemon[];
  onSelectPokemon: (pokemon: Pokemon) => void;
};

export function PokemonTable({ data, onSelectPokemon }: Props) {
  const statNames = useMemo(() => {
    const allStats = data.flatMap((p) => p.stats.map((s) => s.name));

    return Array.from(new Set(allStats));
  }, [data]);

  const statColumns: ColumnDef<Pokemon>[] = statNames.map((stat) => ({
    accessorFn: (row) => {
      const found = row.stats.find((s) => s.name === stat);
      return found?.value ?? 0;
    },
    id: stat,
    header: stat,
    cell: (info) => {
      const value = info.getValue() as number;
      return (
        <span
          className={`text-sm ${
            value >= 100
              ? "text-green-500"
              : value < 50
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {value}
        </span>
      );
    },
  }));
  const columns = useMemo<ColumnDef<Pokemon>[]>(
    () => [
      {
        accessorKey: "avatar",
        header: "Image",
        cell: (info) => {
          const avatar = info.getValue() as string;
          const name = info.row.original.name;
          return <Image src={avatar} width={50} height={50} alt={name} />;
        },
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Name",

        cell: (info) => (
          <span className="capitalize font-medium">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "types",
        header: "Types",
        enableSorting: true,

        sortingFn: (a, b) => {
          const typesA = a.original.types;
          const typesB = b.original.types;

          // Primero, por cantidad de tipos
          const lengthCompare = typesA.length - typesB.length;
          if (lengthCompare !== 0) return lengthCompare;

          // Si tienen misma cantidad, ordenar alfabéticamente por primer tipo
          const typeA = typesA[0]?.type.name ?? "";
          const typeB = typesB[0]?.type.name ?? "";
          return typeA.localeCompare(typeB);
        },

        cell: (info) => {
          const types = info.row.original.types;
          return (
            <div className="flex gap-1">
              {types.map((type) => {
                const bgColor = getTypeColor(type.type.name as PokemonType);

                return (
                  <span
                    key={type.type.name}
                    className="text-xs text-white px-2 py-0.5 rounded-lg capitalize"
                    style={{ backgroundColor: bgColor }}
                  >
                    {type.type.name}
                  </span>
                );
              })}
            </div>
          );
        },
      },
      {
        accessorKey: "height",
        header: "Height",

        cell: (info) => formatHeight(info.getValue() as number),
      },
      {
        accessorKey: "weight",
        header: "Weight",
        cell: (info) => formatWeight(info.getValue() as number),
      },
      ...statColumns,
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <button
            onClick={() => onSelectPokemon(row.original)}
            className="text-blue-600 hover:underline text-xs cursor-pointer"
          >
            View Details
          </button>
        ),
      },
    ],

    [statColumns, onSelectPokemon]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100 text-sm text-gray-700 capitalize">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const isSorted = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-semibold cursor-pointer  "
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div className="flex justify-center gap-2 items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {canSort && (
                        <>
                          {isSorted === "asc" && (
                            <span>
                              <MoveUp className="w-4 h-4" />
                            </span>
                          )}
                          {isSorted === "desc" && (
                            <MoveDown className="w-4 h-4" />
                          )}
                          {isSorted === false && (
                            <span>
                              <ArrowDownUp className="w-4 h-4" />
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="text-sm">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="even:bg-gray-50 text-center">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-t">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
