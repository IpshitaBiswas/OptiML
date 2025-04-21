
import { ReactNode } from "react";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  subtitle?: string;
  className?: string;
}

const ChartContainer = ({ title, subtitle, children, className = "" }: ChartContainerProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-5 border border-gray-100 ${className}`}>
      <div className="mb-4">
        <h3 className="font-semibold text-optiml-purple">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ChartContainer;
