import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ChartContainer from "../../components/dashboard/ChartContainer";
import InsightCard from "../../components/dashboard/InsightCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const KPIComparison = () => {
  // Mock KPI data
  const kpiData = [
    {
      category: "Financial Performance",
      kpis: [
        {
          name: "Revenue Growth",
          yourValue: 15.3,
          industryAvg: 9.5,
          status: "above", // 'above', 'below', 'average'
          trend: "improving", // 'improving', 'declining', 'stable'
        },
        {
          name: "Net Profit Margin",
          yourValue: 24.5,
          industryAvg: 22.0,
          status: "above",
          trend: "improving",
        },
        {
          name: "Return on Equity (ROE)",
          yourValue: 15.4,
          industryAvg: 14.2,
          status: "above",
          trend: "stable",
        },
        {
          name: "Return on Assets (ROA)",
          yourValue: 12.1,
          industryAvg: 12.5,
          status: "below",
          trend: "improving",
        },
      ],
    },
    {
      category: "Operational Efficiency",
      kpis: [
        {
          name: "Operating Expense Ratio",
          yourValue: 35.6,
          industryAvg: 38.2,
          status: "above",
          trend: "improving",
        },
        {
          name: "Asset Turnover Ratio",
          yourValue: 0.85,
          industryAvg: 0.92,
          status: "below",
          trend: "stable",
        },
        {
          name: "Inventory Turnover",
          yourValue: 7.8,
          industryAvg: 7.2,
          status: "above",
          trend: "improving",
        },
        {
          name: "Cash Conversion Cycle",
          yourValue: 45,
          industryAvg: 42,
          status: "below",
          trend: "declining",
        },
      ],
    },
    {
      category: "Liquidity & Solvency",
      kpis: [
        {
          name: "Current Ratio",
          yourValue: 1.8,
          industryAvg: 1.6,
          status: "above",
          trend: "stable",
        },
        {
          name: "Quick Ratio",
          yourValue: 1.2,
          industryAvg: 1.1,
          status: "above",
          trend: "stable",
        },
        {
          name: "Debt-to-Equity Ratio",
          yourValue: 0.85,
          industryAvg: 0.92,
          status: "above",
          trend: "improving",
        },
        {
          name: "Interest Coverage Ratio",
          yourValue: 8.5,
          industryAvg: 7.8,
          status: "above",
          trend: "improving",
        },
      ],
    },
  ];

  // Sample data for radar charts
  const financialKPIs = [
    { metric: 'Revenue Growth', A: 120, B: 100 },
    { metric: 'Profit Margin', A: 98, B: 100 },
    { metric: 'ROE', A: 86, B: 100 },
    { metric: 'Working Capital', A: 99, B: 100 },
    { metric: 'Debt Ratio', A: 85, B: 100 },
  ];

  const operationalKPIs = [
    { metric: 'Efficiency', A: 115, B: 100 },
    { metric: 'Productivity', A: 108, B: 100 },
    { metric: 'Quality', A: 120, B: 100 },
    { metric: 'Time to Market', A: 95, B: 100 },
    { metric: 'Resource Usage', A: 105, B: 100 },
  ];

  const liquidityKPIs = [
    { metric: 'Current Ratio', A: 110, B: 100 },
    { metric: 'Quick Ratio', A: 105, B: 100 },
    { metric: 'Cash Ratio', A: 95, B: 100 },
    { metric: 'Operating Cash', A: 115, B: 100 },
    { metric: 'Net Working Capital', A: 108, B: 100 },
  ];

  // Function to render status indicator
  const renderStatusIndicator = (status: string, trend: string) => {
    if (status === "above") {
      return (
        <span className="flex items-center text-green-600">
          <ChevronUp className="w-4 h-4 mr-1" />
          Above Average
        </span>
      );
    } else if (status === "below") {
      return (
        <span className="flex items-center text-red-600">
          <ChevronDown className="w-4 h-4 mr-1" />
          Below Average
        </span>
      );
    } else {
      return <span className="text-yellow-600">Average</span>;
    }
  };

  // Function to render trend indicator
  const renderTrendIndicator = (trend: string) => {
    if (trend === "improving") {
      return (
        <span className="flex items-center text-green-600 text-sm">
          <ChevronUp className="w-3 h-3 mr-1" />
          Improving
        </span>
      );
    } else if (trend === "declining") {
      return (
        <span className="flex items-center text-red-600 text-sm">
          <ChevronDown className="w-3 h-3 mr-1" />
          Declining
        </span>
      );
    } else {
      return <span className="text-gray-600 text-sm">Stable</span>;
    }
  };

  return (
    <DashboardLayout title="KPI Comparison Dashboard">
      <div className="space-y-6">
        {/* KPI Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartContainer title="Financial KPIs" subtitle="Overall performance">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={financialKPIs}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Your Company" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Industry Benchmark" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <ChartContainer title="Operational KPIs" subtitle="Efficiency metrics">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={operationalKPIs}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Your Company" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Industry Benchmark" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <ChartContainer title="Liquidity & Solvency" subtitle="Financial stability">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={liquidityKPIs}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Your Company" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Industry Benchmark" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </section>

        {/* Detailed KPI Tables */}
        {kpiData.map((category, idx) => (
          <section key={idx}>
            <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
            <ChartContainer title={`${category.category} Metrics`} subtitle="Comparison with industry benchmarks">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        KPI
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Your Value
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Industry Avg
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Variance
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {category.kpis.map((kpi, kpiIdx) => (
                      <tr key={kpiIdx}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium">{kpi.name}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                          {kpi.yourValue}
                          {typeof kpi.yourValue === "number" && !Number.isInteger(kpi.yourValue) ? "" : ""}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                          {kpi.industryAvg}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                          {((kpi.yourValue - kpi.industryAvg) / kpi.industryAvg * 100).toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {renderStatusIndicator(kpi.status, kpi.trend)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {renderTrendIndicator(kpi.trend)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChartContainer>
          </section>
        ))}

        {/* KPI Trend Analysis with actual charts */}
        <section>
          <h2 className="text-xl font-semibold mb-4">KPI Trend Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer title="Key Financial KPIs" subtitle="Quarterly trend (2023)">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { quarter: 'Q1', revenue: 82, profit: 75, margin: 68 },
                    { quarter: 'Q2', revenue: 88, profit: 80, margin: 72 },
                    { quarter: 'Q3', revenue: 95, profit: 85, margin: 78 },
                    { quarter: 'Q4', revenue: 105, profit: 92, margin: 85 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue Growth" />
                  <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit Growth" />
                  <Line type="monotone" dataKey="margin" stroke="#ffc658" name="Margin Growth" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            
            <ChartContainer title="Key Operational KPIs" subtitle="Quarterly trend (2023)">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { quarter: 'Q1', efficiency: 78, productivity: 72, quality: 85 },
                    { quarter: 'Q2', efficiency: 82, productivity: 78, quality: 88 },
                    { quarter: 'Q3', efficiency: 88, productivity: 85, quality: 92 },
                    { quarter: 'Q4', efficiency: 95, productivity: 90, quality: 95 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="efficiency" stroke="#8884d8" name="Efficiency" />
                  <Line type="monotone" dataKey="productivity" stroke="#82ca9d" name="Productivity" />
                  <Line type="monotone" dataKey="quality" stroke="#ffc658" name="Quality" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </section>

        {/* KPI Gap Analysis */}
        <section>
          <h2 className="text-xl font-semibold mb-4">KPI Gap Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InsightCard
              title="Top Performing KPIs"
              description="Your company excels in Revenue Growth (+5.8% vs industry), Net Profit Margin (+2.5%), and Operating Expense Ratio (-2.6%), indicating strong financial management and growth."
              category="positive"
            />
            <InsightCard
              title="Improvement Opportunities"
              description="Focus on Asset Turnover Ratio (-7.6% below industry avg.) and Cash Conversion Cycle (+7.1% longer than industry), which suggest potential operational efficiency gains."
              category="negative"
            />
            <InsightCard
              title="Financial Stability Strength"
              description="Superior performance in all liquidity and solvency metrics (Current Ratio, Quick Ratio, D/E Ratio, Interest Coverage) positions your company with strong financial stability."
              category="positive"
            />
            <InsightCard
              title="Trend Alert: Cash Conversion"
              description="Cash Conversion Cycle is the only KPI showing a declining trend while already below industry average. Consider implementing working capital optimization strategies."
              category="negative"
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default KPIComparison;
