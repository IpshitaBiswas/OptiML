
import { Lightbulb } from "lucide-react";

interface InsightCardProps {
  title: string;
  description: string;
  category?: "positive" | "negative" | "neutral";
}

const InsightCard = ({ 
  title, 
  description, 
  category = "neutral" 
}: InsightCardProps) => {
  const getBgColor = () => {
    switch (category) {
      case "positive":
        return "bg-green-50 border-green-200";
      case "negative":
        return "bg-red-50 border-red-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getIconColor = () => {
    switch (category) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getBgColor()}`}>
      <div className="flex items-start">
        <div className={`mr-3 ${getIconColor()}`}>
          <Lightbulb size={20} />
        </div>
        <div>
          <h4 className="font-medium mb-1">{title}</h4>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
