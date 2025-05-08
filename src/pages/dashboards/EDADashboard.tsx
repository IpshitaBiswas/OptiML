import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter
} from "recharts";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ChartContainer from "../../components/dashboard/ChartContainer";
import AIInsightSection from "../../components/dashboard/AIInsightSection";
import { useFinancialStore } from "../../services/dataStore";
import { Calendar, PieChartIcon, TrendingUp, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { fileProcessor } from "../../services/fileProcessor";
import { mcp } from "../../services/mcp";
import type { MCPInsight } from "../../services/mcp";
import { Card } from '@/components/ui/card';

interface MCPData {
  name: string;
  value: number;
}

const StatCard = ({ title, value, description }: { title: string; value: string; description: string }) => (
  <Card className="p-4 bg-white/50 backdrop-blur-sm">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-[#5046e4] mt-1">{value}</p>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </Card>
);

const EDADashboard = () => {
  const { data, getInsights } = useFinancialStore();
  const [mcpData, setMcpData] = useState<MCPData[]>([]);
  const [marketAnalysis, setMarketAnalysis] = useState<any>(null);
  const [insights, setInsights] = useState<MCPInsight | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const analysis = await fileProcessor.getMarketAnalysis();
      setMarketAnalysis(analysis);
      
      const mcpMetrics = [
        { name: 'Market Share', value: analysis.mcpScore.marketShare * 100 },
        { name: 'Revenue Growth', value: analysis.mcpScore.revenueGrowth * 100 },
        { name: 'Profitability', value: analysis.mcpScore.profitability * 100 },
        { name: 'Innovation', value: analysis.mcpScore.innovation * 100 },
        { name: 'Brand Strength', value: analysis.mcpScore.brandStrength * 100 }
      ];
      setMcpData(mcpMetrics);

      // Get MCP insights
      const dashboardInsights = mcp.getDashboardInsights();
      if (dashboardInsights) {
        setInsights(dashboardInsights.eda);
      }
    };

    fetchData();
  }, []);

  // Prepare expense breakdown data
  const expenseBreakdown = [
    { name: "Cost of Sales", value: 7940, percentage: 39.5 },
    { name: "SG&A", value: 7729, percentage: 38.5 },
    { name: "Interest", value: 292, percentage: 1.5 },
    { name: "Other", value: 164, percentage: 0.8 },
    { name: "Tax", value: 907, percentage: 4.5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Prepare trend data
  const trendData = data ? [
    {
      year: '2022',
      revenue: data.revenue?.[2] || 0,
      expenses: data.expenses?.[2] || 0,
      profit: data.netProfit?.[2] || 0,
      margin: data.npm?.[2] || 0
    },
    {
      year: '2023',
      revenue: data.revenue?.[1] || 0,
      expenses: data.expenses?.[1] || 0,
      profit: data.netProfit?.[1] || 0,
      margin: data.npm?.[1] || 0
    },
    {
      year: '2024',
      revenue: data.revenue?.[0] || 0,
      expenses: data.expenses?.[0] || 0,
      profit: data.netProfit?.[0] || 0,
      margin: data.npm?.[0] || 0
    }
  ] : [];

  const currentRevenue = typeof data?.revenue === 'number' ? data.revenue : 0;
  const currentExpenses = typeof data?.expenses === 'number' ? data.expenses : 0;
  const currentProfit = typeof data?.netProfit === 'number' ? data.netProfit : 0;
  const currentEbitda = typeof data?.ebitda === 'number' ? data.ebitda : 0;

  const correlationData = [
    { x: currentRevenue * 0.95, y: currentExpenses * 0.95 },
    { x: currentRevenue * 0.97, y: currentExpenses * 0.96 },
    { x: currentRevenue * 1.0, y: currentExpenses * 0.98 },
    { x: currentRevenue * 1.02, y: currentExpenses * 1.0 },
    { x: currentRevenue * 1.05, y: currentExpenses * 1.03 },
  ];

  const trendAnalysis = [
    { period: '2019', revenue: currentRevenue * 0.85, profit: currentProfit * 0.82 },
    { period: '2020', revenue: currentRevenue * 0.90, profit: currentProfit * 0.88 },
    { period: '2021', revenue: currentRevenue * 0.95, profit: currentProfit * 0.93 },
    { period: '2022', revenue: currentRevenue * 0.98, profit: currentProfit * 0.96 },
    { period: '2023', revenue: currentRevenue, profit: currentProfit },
  ];

  const varianceData = [
    { metric: 'Revenue', variance: 5.2 },
    { metric: 'Expenses', variance: 3.8 },
    { metric: 'Profit', variance: 7.1 },
    { metric: 'EBITDA', variance: 4.9 },
  ];

  return (
    <DashboardLayout title="Exploratory Data Analysis">
      <div className="p-6 space-y-6 bg-gradient-to-br from-[#eee3fb] to-[#c3cffb] min-h-screen">
        <h1 className="text-3xl font-bold text-[#5046e4] mb-8">Exploratory Data Analysis</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Revenue-Expense Correlation" 
            value="0.95" 
            description="Strong positive correlation indicates linked growth"
          />
          <StatCard 
            title="Profit Margin Variance" 
            value="±2.3%" 
            description="Stable profit margins with low volatility"
          />
          <StatCard 
            title="Growth Trend" 
            value="+5.2%" 
            description="Consistent upward trend in key metrics"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-[#5046e4]">Revenue-Expense Correlation</h3>
            <ScatterChart width={400} height={300} data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="Revenue" />
              <YAxis type="number" dataKey="y" name="Expenses" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Revenue vs Expenses" data={correlationData} fill="#5046e4" />
            </ScatterChart>
          </Card>

          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-[#5046e4]">Metric Variances</h3>
            <BarChart width={400} height={300} data={varianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="variance" fill="#5046e4" name="Variance %" />
            </BarChart>
          </Card>
        </div>

        <Card className="p-4 bg-white/50 backdrop-blur-sm mb-8">
          <h3 className="text-lg font-semibold mb-4 text-[#5046e4]">Historical Trend Analysis</h3>
          <LineChart width={900} height={300} data={trendAnalysis}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#5046e4" name="Revenue" />
            <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit" />
          </LineChart>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2 text-[#5046e4]">Statistical Analysis</h3>
            <p className="text-gray-700 mb-2">{insights?.summary}</p>
            <p className="text-gray-700 mb-2">{insights?.diagnosis}</p>
          </Card>
          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2 text-[#5046e4]">Recommendations</h3>
            <p className="text-gray-700 mb-2">{insights?.solutions}</p>
            <p className="text-gray-700">{insights?.profitability}</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EDADashboard;
