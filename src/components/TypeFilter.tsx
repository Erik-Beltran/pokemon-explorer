import { POKEMON_TYPES } from "@/types/pokemon";

type TypeFilterProps = {
  selectedType: string;
  onChange: (type: string) => void;
};

const TypeFilter = ({ onChange, selectedType }: TypeFilterProps) => {
  return (
    <div className="mb-8 flex max-md:flex-col gap-2 justify-start lg:items-center max-md:w-full">
      <label className="mr-2 text-sm font-medium">Type:</label>
      <select
        value={selectedType}
        onChange={(e) => onChange(e.target.value)}
        className="px-2 py-1 rounded  border border-gray-400"
      >
        <option value="all">All Types</option>
        {POKEMON_TYPES.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;
