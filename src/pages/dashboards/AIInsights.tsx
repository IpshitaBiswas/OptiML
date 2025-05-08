import { Brain, TrendingUp, DollarSign, AlertTriangle, Target } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useFinancialStore } from "../../services/dataStore";
import InsightCard from "../../components/dashboard/InsightCard";
import ChartContainer from "../../components/dashboard/ChartContainer";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { useEffect, useState } from "react";
import { fileProcessor } from "../../services/fileProcessor";
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar } from 'recharts';

const AIInsights = () => {
  const { data, getInsights } = useFinancialStore();
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [mcpData, setMcpData] = useState<any>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      if (data) {
        const insights = await fileProcessor.generateAIRecommendations(data);
        setAiInsights(insights);
        const marketAnalysis = await fileProcessor.getMarketAnalysis();
        setMcpData(marketAnalysis);
      }
    };
    fetchInsights();
  }, [data]);

  const getInsightIcon = (category: string) => {
    switch (category) {
      case 'profitability':
        return <DollarSign className="w-5 h-5" />;
      case 'cost':
        return <TrendingUp className="w-5 h-5" />;
      case 'risk':
        return <AlertTriangle className="w-5 h-5" />;
      case 'market':
        return <Target className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const profitabilityInsights = [
    {
      category: 'profitability',
      title: 'Profit Margin Optimization',
      description: `Increase net profit margin from 11.8% to 14.4% by reducing operating expenses by 5% (potential savings of $406M based on 2023 expenses of $8,131M).`,
      confidence: 0.85
    },
    {
      category: 'cost',
      title: 'Supply Chain Efficiency',
      description: `Optimize inventory management to reduce carrying costs. Current inventory of $1,987M can be optimized for $60M annual savings.`,
      confidence: 0.75
    },
    {
      category: 'risk',
      title: 'Currency Risk Management',
      description: `Implement hedging strategies to mitigate $343M currency impact on comprehensive income, protecting 1.8% of revenue exposed to currency risk.`,
      confidence: 0.9
    }
  ];

  const currentRevenue = typeof data?.revenue === 'number' ? data.revenue : 0;
  const currentProfit = typeof data?.netProfit === 'number' ? data.netProfit : 0;
  const currentEbitda = typeof data?.ebitda === 'number' ? data.ebitda : 0;

  const trendData = [
    { month: 'Jan', actual: currentRevenue, predicted: currentRevenue * 1.05 },
    { month: 'Feb', actual: currentRevenue, predicted: currentRevenue * 1.07 },
    { month: 'Mar', actual: currentRevenue, predicted: currentRevenue * 1.1 },
  ];

  const mcpMetrics = mcpData ? [
    { name: 'Market Share', value: mcpData.mcpScore.marketShare * 100 },
    { name: 'Revenue Growth', value: mcpData.mcpScore.revenueGrowth * 100 },
    { name: 'Profitability', value: mcpData.mcpScore.profitability * 100 },
    { name: 'Innovation', value: mcpData.mcpScore.innovation * 100 },
    { name: 'Brand Strength', value: mcpData.mcpScore.brandStrength * 100 }
  ] : [];

  const insights = getInsights('ai');

  const performanceData = [
    { metric: 'Revenue', current: currentRevenue, target: currentRevenue * 1.1 },
    { metric: 'Profit', current: currentProfit, target: currentProfit * 1.15 },
    { metric: 'EBITDA', current: currentEbitda, target: currentEbitda * 1.12 },
  ];

  return (
    <DashboardLayout title="AI-Driven Insights">
      <div className="space-y-6">
        {/* Key Insights */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Profitability Optimization Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profitabilityInsights.map((insight, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-optiml-light rounded-full">
                    {getInsightIcon(insight.category)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {(insight.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                <p className="text-gray-600 text-sm">{insight.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Trends */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Financial Performance Trends</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer title="Revenue & Profit Trends" subtitle="3-Year Performance">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="actual"
                      stroke="#8884d8"
                      name="Actual"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="predicted"
                      stroke="#82ca9d"
                      name="AI Predicted"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>

            <ChartContainer title="Profitability Metrics" subtitle="Key Ratios">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#8884d8"
                      name="Actual"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </div>
        </section>

        {/* Risk Analysis */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Risk Analysis & Mitigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartContainer title="Currency Risk Exposure" subtitle="Impact Analysis">
              <div className="space-y-4 p-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Currency Impact</span>
                    <span className="font-medium">$343M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: '34.3%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Revenue Exposure</span>
                    <span className="font-medium">1.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: '1.8%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </ChartContainer>

            <ChartContainer title="Operational Risk Metrics" subtitle="Key Indicators">
              <div className="space-y-4 p-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Debt-to-Equity Ratio</span>
                    <span className="font-medium">0.94</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-400 h-2 rounded-full"
                      style={{ width: '94%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current Ratio</span>
                    <span className="font-medium">1.23</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-400 h-2 rounded-full"
                      style={{ width: '82%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </ChartContainer>
          </div>
        </section>

        {/* AI Insights */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Strategic Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-optiml-light rounded-full">
                    {getInsightIcon(insight.category)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {(insight.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                <p className="text-gray-600 text-sm">{insight.description}</p>
                {insight.impact && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Current {insight.impact.metric}</span>
                      <span>${insight.impact.value.toLocaleString()}M</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Potential</span>
                      <span>${insight.impact.potential.toLocaleString()}M</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* MCP Analysis */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Market Competitive Position</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer title="MCP Score Components" subtitle="Competitive Metrics">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={mcpMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Colgate"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>

            <ChartContainer title="Market Position" subtitle="Competitive Analysis">
              <div className="space-y-4 p-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall MCP Score</span>
                    <span className="font-medium">
                      {mcpData ? (mcpData.mcpScore.overall * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-optiml h-2 rounded-full"
                      style={{ width: `${mcpData ? mcpData.mcpScore.overall * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Market Share Distribution</h3>
                  {mcpData?.competitors.map((competitor: any) => (
                    <div key={competitor.name} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{competitor.name}</span>
                        <span>{(competitor.marketShare * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full"
                          style={{ width: `${competitor.marketShare * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Colgate</span>
                      <span>
                        {mcpData ? (mcpData.mcpScore.marketShare * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-optiml h-2 rounded-full"
                        style={{ width: `${mcpData ? mcpData.mcpScore.marketShare * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </ChartContainer>
          </div>
        </section>

        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#5046e4]">Revenue Trend Analysis</h2>
            <LineChart width={800} height={400} data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#5046e4" name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="AI Predicted" />
            </LineChart>
          </TabsContent>

          <TabsContent value="performance" className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#5046e4]">Performance vs Targets</h2>
            <BarChart width={800} height={400} data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="#5046e4" name="Current" />
              <Bar dataKey="target" fill="#82ca9d" name="AI Target" />
            </BarChart>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AIInsights;
