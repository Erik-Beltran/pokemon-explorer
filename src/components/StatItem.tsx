interface StatItemProps {
  label?: string;
  value: string | number;
}

const StatItem = ({ label, value }: StatItemProps) => {
  return (
    <div className="w-full">
      {label && <h3 className="font-bold  mb-2 w12 text-center">{label}</h3>}
      <span className="rounded-lg bg-gray-500/10 text-gray-600 block text-center p-1 ">
        {value}
      </span>
    </div>
  );
};

export default StatItem;
