import { LayoutGrid, Table } from "lucide-react";

type ViewMode = "grid" | "table";

type ViewModeProps = {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export const ViewMode = ({ onChange, value }: ViewModeProps) => {
  return (
    <div className="flex lg:items-center gap-2 max-md:flex-col max-md:w-full">
      <label htmlFor="view-mode" className="text-sm font-medium flex gap-1 ">
        View
        {value === "grid" ? (
          <LayoutGrid className="w-5 h-5 text-gray-600" />
        ) : (
          <Table className="w-5 h-5 text-gray-600" />
        )}
      </label>

      <select
        id="view-mode"
        value={value}
        onChange={(e) => onChange(e.target.value as ViewMode)}
        className="border border-gray-400   px-2 py-1 rounded"
      >
        <option value="grid">Grid </option>
        <option value="table">Table </option>
      </select>
    </div>
  );
};
