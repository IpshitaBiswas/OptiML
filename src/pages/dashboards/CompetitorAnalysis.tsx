import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ChartContainer from "../../components/dashboard/ChartContainer";
import InsightCard from "../../components/dashboard/InsightCard";
import { Award, TrendingDown, TrendingUp } from "lucide-react";
import { useFinancialStore } from "../../services/dataStore";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const CompetitorAnalysis = () => {
  const { data, competitors } = useFinancialStore();
  const companyName = sessionStorage.getItem('companyName') || 'Your Company';

  const competitorData = [
    {
      name: companyName,
      revenue: data?.revenue[data.revenue.length - 1] || 5600000,
      profit: data?.netProfit[data.netProfit.length - 1] || 1370000,
      profitMargin: data?.npm[data.npm.length - 1] || 24.5,
      marketShare: 12.4,
      growthRate: 15.3,
    },
    {
      name: competitors[0] || "Competitor A",
      revenue: 7200000,
      profit: 1620000,
      profitMargin: 22.5,
      marketShare: 16.0,
      growthRate: 10.8,
    },
    {
      name: competitors[1] || "Competitor B",
      revenue: 4800000,
      profit: 1100000,
      profitMargin: 22.9,
      marketShare: 10.6,
      growthRate: 13.5,
    },
    {
      name: competitors[2] || "Competitor C",
      revenue: 6500000,
      profit: 1430000,
      profitMargin: 22.0,
      marketShare: 14.4,
      growthRate: 8.2,
    },
    {
      name: "Industry Average",
      revenue: 6000000,
      profit: 1320000,
      profitMargin: 22.0,
      marketShare: null,
      growthRate: 9.5,
    },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  return (
    <DashboardLayout title="Competitor Analysis">
      <div className="space-y-6">
        {/* Market Position Overview */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Market Position Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer title="Revenue Comparison" subtitle="Annual revenue in millions">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={competitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${(value as number / 1000000).toFixed(1)}M`} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="Market Share Distribution" subtitle="Percentage of total market">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={competitorData.filter(d => d.marketShare !== null)}
                    dataKey="marketShare"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {competitorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </section>

        {/* Performance Metrics */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer title="Profit Margin Comparison" subtitle="Net profit margin (%)">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={competitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="profitMargin" fill="#82ca9d" name="Profit Margin" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="Growth Rate Comparison" subtitle="Year-over-year growth (%)">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={competitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="growthRate" fill="#ffc658" name="Growth Rate" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </section>

        {/* Competitive Insights */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Competitive Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InsightCard
              title="Market Leadership"
              description={`${competitors[0] || 'Competitor A'} leads in market share at 16.0%, presenting an opportunity for strategic growth initiatives.`}
              category="neutral"
            />
            <InsightCard
              title="Profit Efficiency"
              description={`Your profit margin of ${data?.npm[data.npm.length - 1]?.toFixed(1) || '24.5'}% exceeds the industry average by ${((data?.npm[data.npm.length - 1] || 24.5) - 22.0).toFixed(1)}%, indicating strong operational efficiency.`}
              category="positive"
            />
            <InsightCard
              title="Growth Performance"
              description="Your growth rate of 15.3% outperforms all competitors and the industry average of 9.5%."
              category="positive"
            />
            <InsightCard
              title="Market Opportunity"
              description={`Analysis suggests potential for market share growth by targeting ${competitors[1] || 'Competitor B'}'s customer segments.`}
              category="neutral"
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default CompetitorAnalysis;
