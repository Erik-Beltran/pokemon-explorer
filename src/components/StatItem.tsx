interface StatItemProps {
  label?: string;
  value: string | number;
  bgColor?: string;
}

const StatItem = ({ label, value, bgColor }: StatItemProps) => {
  return (
    <div className="w-full">
      {label && <h3 className="font-bold  mb-2 w12 text-center">{label}</h3>}
      <span
        className={`rounded-lg bg-gray-500/10  block text-center p-1 ${
          bgColor ? "text-white" : "text-gray-600"
        }`}
        style={{ backgroundColor: bgColor }}
      >
        {value}
      </span>
    </div>
  );
};

export default StatItem;
