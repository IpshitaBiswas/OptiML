
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ChartContainer from "../../components/dashboard/ChartContainer";
import InsightCard from "../../components/dashboard/InsightCard";
import { Brain, LineChart, TrendingUp, Zap } from "lucide-react";

const AIInsights = () => {
  // Mock AI insights data
  const insights = {
    revenue: [
      {
        title: "Optimize Product Mix",
        description: "Shifting product mix to favor high-margin Product Line B could increase overall revenue by an estimated 8.3% without additional marketing spend.",
        impact: "High",
        category: "positive",
        timeframe: "Medium-term",
      },
      {
        title: "Regional Expansion Opportunity",
        description: "Market analysis shows untapped potential in the Western region with 22% lower competition than your current primary markets.",
        impact: "High",
        category: "positive",
        timeframe: "Long-term",
      },
    ],
    cost: [
      {
        title: "Supplier Consolidation",
        description: "Consolidating 4 smaller suppliers into your top 2 existing relationships could reduce procurement costs by an estimated 12.5%.",
        impact: "Medium",
        category: "positive",
        timeframe: "Short-term",
      },
      {
        title: "Operational Process Optimization",
        description: "Automating inventory management could reduce labor costs by 15% and inventory carrying costs by 8.3%.",
        impact: "Medium",
        category: "positive",
        timeframe: "Medium-term",
      },
    ],
    risk: [
      {
        title: "Cash Flow Vulnerability",
        description: "Current accounts receivable aging patterns indicate 15% of revenue has extended beyond optimal collection periods, posing liquidity risks.",
        impact: "Medium",
        category: "negative",
        timeframe: "Short-term",
      },
      {
        title: "Competitor Pricing Pressure",
        description: "Competitor A has reduced prices by 7.5% in Q4 2023, potentially eroding your market share in the consumer segment.",
        impact: "Medium",
        category: "negative",
        timeframe: "Short-term",
      },
    ],
    predictions: [
      {
        title: "Revenue Growth Projection",
        description: "Based on current trajectory and market conditions, our AI model predicts 17.8% YoY growth for 2024, exceeding your internal forecast of 15%.",
        impact: "High",
        category: "positive",
        timeframe: "Long-term",
      },
      {
        title: "Margin Compression Risk",
        description: "Rising raw material costs projected to reduce gross margins by 1.2-1.8 percentage points in Q1-Q2 2024 unless mitigating actions are taken.",
        impact: "Medium",
        category: "negative",
        timeframe: "Medium-term",
      },
    ],
  };

  // Render impact badge
  const renderImpactBadge = (impact: string) => {
    let bgColor = "bg-blue-100 text-blue-800";
    
    if (impact === "High") {
      bgColor = "bg-purple-100 text-purple-800";
    } else if (impact === "Medium") {
      bgColor = "bg-blue-100 text-blue-800";
    } else if (impact === "Low") {
      bgColor = "bg-gray-100 text-gray-800";
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
        {impact} Impact
      </span>
    );
  };

  // Render timeframe badge
  const renderTimeframeBadge = (timeframe: string) => {
    let bgColor = "bg-gray-100 text-gray-800";
    
    if (timeframe === "Short-term") {
      bgColor = "bg-green-100 text-green-800";
    } else if (timeframe === "Medium-term") {
      bgColor = "bg-yellow-100 text-yellow-800";
    } else if (timeframe === "Long-term") {
      bgColor = "bg-orange-100 text-orange-800";
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
        {timeframe}
      </span>
    );
  };

  return (
    <DashboardLayout title="AI Insights">
      <div className="space-y-8">
        {/* AI Summary */}
        <section>
          <ChartContainer 
            title="Executive Summary" 
            subtitle="AI-powered financial analysis and recommendations"
          >
            <div className="prose max-w-none text-gray-700">
              <p>
                Based on our analysis of your financial data and competitive landscape, OptiML has identified 
                several high-impact opportunities to enhance your financial performance. Our AI models suggest that implementing 
                the recommended strategies could potentially:
              </p>
              <ul className="list-disc pl-6 my-4">
                <li>Increase revenue by an estimated <strong>8-10%</strong> within the next 12 months</li>
                <li>Improve profit margins by <strong>2.5-3.2 percentage points</strong></li>
                <li>Optimize operational efficiency to reduce costs by <strong>9-12%</strong></li>
                <li>Strengthen competitive positioning against key market rivals</li>
              </ul>
              <p>
                The following insights are prioritized based on potential impact, implementation feasibility, 
                and alignment with industry benchmarks. Each recommendation includes specific actions and expected outcomes.
              </p>
            </div>
          </ChartContainer>
        </section>
        
        {/* Revenue Optimization */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-optiml-purple" />
            Revenue Optimization Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.revenue.map((insight, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow border-l-4 border-green-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{insight.title}</h3>
                  <div className="flex space-x-2">
                    {renderImpactBadge(insight.impact)}
                    {renderTimeframeBadge(insight.timeframe)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{insight.description}</p>
                <div className="mt-auto pt-2 flex justify-between items-center border-t border-gray-100">
                  <span className="text-sm text-gray-500">Confidence: 92%</span>
                  <button className="text-optiml-purple text-sm font-medium hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Cost Reduction */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 h-6 w-6 text-optiml-purple" />
            Cost Optimization Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.cost.map((insight, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{insight.title}</h3>
                  <div className="flex space-x-2">
                    {renderImpactBadge(insight.impact)}
                    {renderTimeframeBadge(insight.timeframe)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{insight.description}</p>
                <div className="mt-auto pt-2 flex justify-between items-center border-t border-gray-100">
                  <span className="text-sm text-gray-500">Confidence: 87%</span>
                  <button className="text-optiml-purple text-sm font-medium hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Risk Management */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Brain className="mr-2 h-6 w-6 text-optiml-purple" />
            Strategic Risk Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.risk.map((insight, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow border-l-4 border-red-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{insight.title}</h3>
                  <div className="flex space-x-2">
                    {renderImpactBadge(insight.impact)}
                    {renderTimeframeBadge(insight.timeframe)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{insight.description}</p>
                <div className="mt-auto pt-2 flex justify-between items-center border-t border-gray-100">
                  <span className="text-sm text-gray-500">Confidence: 83%</span>
                  <button className="text-optiml-purple text-sm font-medium hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Predictions */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <LineChart className="mr-2 h-6 w-6 text-optiml-purple" />
            Financial Forecasts & Predictions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartContainer title="Revenue Forecast (2024)" subtitle="Quarterly projection">
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 italic">Line chart would render here</p>
              </div>
            </ChartContainer>
            
            <ChartContainer title="Profit Margin Forecast (2024)" subtitle="Quarterly projection">
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 italic">Line chart would render here</p>
              </div>
            </ChartContainer>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.predictions.map((insight, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow border-l-4 border-purple-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{insight.title}</h3>
                  <div className="flex space-x-2">
                    {renderImpactBadge(insight.impact)}
                    {renderTimeframeBadge(insight.timeframe)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{insight.description}</p>
                <div className="mt-auto pt-2 flex justify-between items-center border-t border-gray-100">
                  <span className="text-sm text-gray-500">Confidence: 85%</span>
                  <button className="text-optiml-purple text-sm font-medium hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Implementation Plan */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recommended Implementation Plan</h2>
          <ChartContainer title="Action Plan Timeline">
            <div className="space-y-6">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                {/* Timeline items */}
                <div className="space-y-8">
                  {/* Item 1 */}
                  <div className="relative pl-12">
                    <div className="absolute left-0 rounded-full bg-optiml-purple w-8 h-8 flex items-center justify-center text-white">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-md mb-2">Short-term Actions (Next 30 days)</h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Initiate supplier consolidation process to reduce procurement costs</li>
                        <li>Implement accounts receivable policy changes to address cash flow vulnerability</li>
                        <li>Review competitive pricing strategy in consumer segment</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Item 2 */}
                  <div className="relative pl-12">
                    <div className="absolute left-0 rounded-full bg-optiml-purple w-8 h-8 flex items-center justify-center text-white">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-md mb-2">Medium-term Actions (1-3 months)</h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Shift product mix to favor higher-margin Product Line B</li>
                        <li>Begin automation of inventory management processes</li>
                        <li>Develop strategy to mitigate projected margin compression</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Item 3 */}
                  <div className="relative pl-12">
                    <div className="absolute left-0 rounded-full bg-optiml-purple w-8 h-8 flex items-center justify-center text-white">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-md mb-2">Long-term Initiatives (3-12 months)</h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Conduct market research for Western region expansion</li>
                        <li>Develop implementation timeline for regional growth strategy</li>
                        <li>Allocate resources based on projected 17.8% YoY growth trajectory</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-optiml-purple">Expected Outcomes</h3>
                <p className="text-gray-700">
                  Implementing these recommendations in sequence is projected to result in a 5.3% 
                  revenue increase within 90 days, 8.8% within 180 days, and full 9.7% improvement 
                  within 12 months, while increasing profit margins by 3.2 percentage points.
                </p>
              </div>
            </div>
          </ChartContainer>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AIInsights;
