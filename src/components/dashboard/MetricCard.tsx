
import { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  isPercentage?: boolean;
  isCurrency?: boolean;
}

const MetricCard = ({
  title,
  value,
  icon,
  change,
  isPercentage = false,
  isCurrency = false,
}: MetricCardProps) => {
  const formattedValue = () => {
    if (isPercentage) {
      return `${value}%`;
    }
    if (isCurrency) {
      return typeof value === "number"
        ? `$${value.toLocaleString()}`
        : `$${value}`;
    }
    return value;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold mt-1">{formattedValue()}</p>
        </div>
        {icon && <div className="text-optiml-purple">{icon}</div>}
      </div>
      
      {change && (
        <div className="mt-4 flex items-center">
          <span
            className={`flex items-center text-sm font-medium ${
              change.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change.isPositive ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-1" />
            )}
            {Math.abs(change.value)}%
          </span>
          <span className="text-gray-500 text-sm ml-1">vs previous quarter</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
