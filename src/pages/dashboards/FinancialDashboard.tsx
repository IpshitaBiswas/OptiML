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
import { useFinancialStore } from "../../services/dataStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from '@/components/ui/card';
import { PieChart, Pie } from 'recharts';

const MetricCard = ({ title, value, change }: { title: string; value: string; change?: string }) => (
  <Card className="p-4 bg-white/50 backdrop-blur-sm">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-[#5046e4] mt-1">{value}</p>
    {change && <p className="text-sm text-green-600 mt-1">↑ {change}</p>}
  </Card>
);

const FinancialDashboard = () => {
  const { data, getInsights } = useFinancialStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if no data is available
    if (!data) {
      navigate('/');
    }
  }, [data, navigate]);

  if (!data) {
    return null;
  }

  const insights = getInsights('financial');

  const currentRevenue = typeof data?.revenue === 'number' ? data.revenue : 0;
  const currentExpenses = typeof data?.expenses === 'number' ? data.expenses : 0;
  const currentProfit = typeof data?.netProfit === 'number' ? data.netProfit : 0;
  const currentEbitda = typeof data?.ebitda === 'number' ? data.ebitda : 0;

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  const revenueData = [
    { name: 'Q1', value: currentRevenue * 0.23 },
    { name: 'Q2', value: currentRevenue * 0.25 },
    { name: 'Q3', value: currentRevenue * 0.27 },
    { name: 'Q4', value: currentRevenue * 0.25 },
  ];

  const expenseBreakdown = [
    { name: 'COGS', value: currentExpenses * 0.65 },
    { name: 'Operating', value: currentExpenses * 0.20 },
    { name: 'Marketing', value: currentExpenses * 0.10 },
    { name: 'Other', value: currentExpenses * 0.05 },
  ];

  const profitTrend = [
    { month: 'Jan', profit: currentProfit * 0.08 },
    { month: 'Feb', profit: currentProfit * 0.09 },
    { month: 'Mar', profit: currentProfit * 0.08 },
    { month: 'Apr', profit: currentProfit * 0.085 },
    { month: 'May', profit: currentProfit * 0.09 },
    { month: 'Jun', profit: currentProfit * 0.095 },
  ];

  return (
    <DashboardLayout title="Financial Dashboard">
      <div className="p-6 space-y-6 bg-gradient-to-br from-[#eee3fb] to-[#c3cffb] min-h-screen">
        <h1 className="text-3xl font-bold text-[#5046e4] mb-8">Financial Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Revenue" 
            value={formatCurrency(currentRevenue)} 
            change="5.2% vs prev year" 
          />
          <MetricCard 
            title="Expenses" 
            value={formatCurrency(currentExpenses)} 
            change="3.1% vs prev year" 
          />
          <MetricCard 
            title="Net Profit" 
            value={formatCurrency(currentProfit)} 
            change="7.8% vs prev year" 
          />
          <MetricCard 
            title="EBITDA" 
            value={formatCurrency(currentEbitda)} 
            change="6.5% vs prev year" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-[#5046e4]">Quarterly Revenue</h3>
            <BarChart width={400} height={300} data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#5046e4" name="Revenue" />
            </BarChart>
          </Card>

          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-[#5046e4]">Expense Breakdown</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={expenseBreakdown}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#5046e4"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </div>

        <Card className="p-4 bg-white/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 text-[#5046e4]">Profit Trend</h3>
          <LineChart width={900} height={300} data={profitTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profit" stroke="#5046e4" name="Net Profit" />
          </LineChart>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2 text-[#5046e4]">Financial Analysis</h3>
            <p className="text-gray-700 mb-2">{insights.summary}</p>
            <p className="text-gray-700 mb-2">{insights.diagnosis}</p>
          </Card>
          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2 text-[#5046e4]">Recommendations</h3>
            <p className="text-gray-700 mb-2">{insights.solutions}</p>
            <p className="text-gray-700">{insights.profitability}</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialDashboard;
