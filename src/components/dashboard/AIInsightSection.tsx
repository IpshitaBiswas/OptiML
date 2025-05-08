import { Brain, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";
import { MCPInsight } from "../../services/mcp";

interface AIInsightSectionProps {
  insight: MCPInsight;
  title: string;
}

const AIInsightSection = ({ insight, title }: AIInsightSectionProps) => {
  return (
    <section className="mt-8 border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">AI Insights: {title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-optiml-light rounded-full">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-sm text-gray-500">
                {(insight.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="text-gray-600">{insight.summary}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-full">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Diagnosis</h3>
            <p className="text-gray-600">{insight.diagnosis}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Solutions</h3>
            <p className="text-gray-600">{insight.solutions}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Profitability Impact</h3>
            <p className="text-gray-600">{insight.profitability}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInsightSection; 