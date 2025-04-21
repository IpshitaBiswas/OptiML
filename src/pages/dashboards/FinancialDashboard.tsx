
import { BarChart2, Briefcase, DollarSign, TrendingUp } from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import MetricCard from "../../components/dashboard/MetricCard";
import ChartContainer from "../../components/dashboard/ChartContainer";
import InsightCard from "../../components/dashboard/InsightCard";

// Mock data (in a real application, this would come from API/backend)
const quarterlyData = {
  revenue: [1250000, 1320000, 1450000, 1580000],
  expenses: [980000, 1020000, 1080000, 1150000],
  netProfit: [270000, 300000, 370000, 430000],
  cashFlow: [320000, 350000, 410000, 460000],
  ebitda: [420000, 450000, 520000, 580000],
  pat: [230000, 255000, 315000, 365000],
};

const financialRatios = {
  debtEquity: 0.85,
  npm: 27.2,
  currentRatio: 1.8,
  roe: 15.4,
  roce: 18.9,
};

const FinancialDashboard = () => {
  return (
    <DashboardLayout title="Financial Dashboard">
      <div className="space-y-6">
        {/* Quarterly Financial Summary */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Q4 2023 Financial Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Revenue"
              value={1580000}
              icon={<DollarSign size={20} />}
              change={{ value: 9, isPositive: true }}
              isCurrency
            />
            <MetricCard
              title="Expenses"
              value={1150000}
              icon={<Briefcase size={20} />}
              change={{ value: 6.5, isPositive: false }}
              isCurrency
            />
            <MetricCard
              title="Net Profit"
              value={430000}
              icon={<TrendingUp size={20} />}
              change={{ value: 16.2, isPositive: true }}
              isCurrency
            />
            <MetricCard
              title="EBITDA"
              value={580000}
              icon={<BarChart2 size={20} />}
              change={{ value: 11.5, isPositive: true }}
              isCurrency
            />
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer title="Revenue vs. Expenses" subtitle="By Quarter (2023)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quarterlyData.revenue.map((rev, idx) => ({
                quarter: `Q${idx + 1}`,
                revenue: rev,
                expenses: quarterlyData.expenses[idx]
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Profit Margin Trend" subtitle="By Quarter (2023)">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={quarterlyData.revenue.map((rev, idx) => ({
                quarter: `Q${idx + 1}`,
                margin: ((rev - quarterlyData.expenses[idx]) / rev * 100).toFixed(1)
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="margin" 
                  stroke="#8884d8" 
                  name="Profit Margin %" 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </section>

        {/* Financial Ratios */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Key Financial Ratios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <MetricCard
              title="Debt-to-Equity"
              value={financialRatios.debtEquity}
              change={{ value: 5.2, isPositive: true }}
            />
            <MetricCard
              title="Net Profit Margin"
              value={financialRatios.npm}
              change={{ value: 3.8, isPositive: true }}
              isPercentage
            />
            <MetricCard
              title="Current Ratio"
              value={financialRatios.currentRatio}
              change={{ value: 0.2, isPositive: true }}
            />
            <MetricCard
              title="Return on Equity"
              value={financialRatios.roe}
              change={{ value: 2.1, isPositive: true }}
              isPercentage
            />
            <MetricCard
              title="Return on Capital Employed"
              value={financialRatios.roce}
              change={{ value: 1.5, isPositive: true }}
              isPercentage
            />
          </div>
        </section>

        {/* AI Insights */}
        <section>
          <h2 className="text-xl font-semibold mb-4">AI-Driven Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InsightCard
              title="Revenue Growth Acceleration"
              description="Your Q4 revenue growth rate of 9% outperforms the industry average of 6.2%. Continued focus on your expanding product lines could further enhance this trend."
              category="positive"
            />
            <InsightCard
              title="Expense Optimization Needed"
              description="Expenses are growing at 6.5%, which is outpacing industry benchmarks. Consider reviewing operational costs in marketing and administration."
              category="negative"
            />
            <InsightCard
              title="Strong EBITDA Performance"
              description="Your EBITDA margin of 36.7% is significantly higher than peer average of 28.3%, indicating strong operational efficiency."
              category="positive"
            />
            <InsightCard
              title="Cash Flow Opportunity"
              description="Cash conversion cycle can be improved by optimizing inventory management, potentially releasing an additional $85,000 in working capital."
              category="neutral"
            />
          </div>
        </section>

        {/* Annual Report Summary */}
        <section>
          <ChartContainer 
            title="Annual Report Summary" 
            subtitle="Key highlights from your financial report"
            className="h-auto"
          >
            <div className="prose max-w-none text-gray-700">
              <p>
                The company demonstrated strong financial performance in 2023, with annual revenue reaching $5.6M, a 15.3% increase from the previous year. The fourth quarter showed particular strength, with the highest quarterly revenue recorded to date.
              </p>
              <p className="mt-3">
                Key areas of financial improvement include:
              </p>
              <ul className="list-disc pl-6 my-2">
                <li>Gross profit margin improvement from 58% to 62%</li>
                <li>Reduced customer acquisition costs by 12%</li>
                <li>R&D investment increased by 18% while maintaining profitability</li>
                <li>Debt-to-equity ratio improved from 0.92 to 0.85</li>
              </ul>
              <p className="mt-3">
                The company's financial position remains strong, with sufficient liquidity to fund ongoing operations and strategic initiatives planned for 2024.
              </p>
            </div>
          </ChartContainer>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default FinancialDashboard;
