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
} from "recharts";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ChartContainer from "../../components/dashboard/ChartContainer";
import InsightCard from "../../components/dashboard/InsightCard";
import { Calendar, PieChart as PieChartIcon, TrendingUp } from "lucide-react";

const distributionData = [
  { value: 1200000, range: "1M-1.2M" },
  { value: 1500000, range: "1.2M-1.4M" },
  { value: 1800000, range: "1.4M-1.6M" },
  { value: 1300000, range: "1.6M-1.8M" },
  { value: 1100000, range: "1.8M-2M" },
];

const correlationData = [
  { name: "Revenue", value: 35 },
  { name: "Cost", value: 25 },
  { name: "Profit", value: 20 },
  { name: "Growth", value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const EDADashboard = () => {
  return (
    <DashboardLayout title="Exploratory Data Analysis">
      <div className="space-y-6">
        {/* Statistical Summary */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Statistical Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer title="Revenue Distribution" subtitle="Statistical overview">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Mean</p>
                    <p className="text-lg font-medium">$1,400,000</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Median</p>
                    <p className="text-lg font-medium">$1,385,000</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Standard Deviation</p>
                    <p className="text-lg font-medium">$142,000</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Variance</p>
                    <p className="text-lg font-medium">20,164,000,000</p>
                  </div>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </ChartContainer>
            
            <ChartContainer title="Revenue Distribution" subtitle="Statistical overview">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={correlationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {correlationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {correlationData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{entry.name} ({entry.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </ChartContainer>
          </div>
        </section>

        {/* Correlation Analysis */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Correlation Analysis</h2>
          <ChartContainer title="Financial Metrics Correlation" subtitle="Relationship between key financial indicators">
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 italic">Correlation heatmap would render here</p>
            </div>
          </ChartContainer>
        </section>

        {/* Trend Analysis */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Trend Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer title="12-Month Performance" subtitle="Key metrics over time">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                    <span className="text-sm">Revenue</span>
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                    <span className="text-sm">Expenses</span>
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                    <span className="text-sm">Profit</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">Jan - Dec 2023</span>
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 italic">Line chart would render here</p>
              </div>
            </ChartContainer>

            <ChartContainer title="Financial Ratios Trend" subtitle="Quarterly changes">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-1"></span>
                    <span className="text-sm">ROE</span>
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                    <span className="text-sm">NPM</span>
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-cyan-500 rounded-full mr-1"></span>
                    <span className="text-sm">D/E Ratio</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">Quarterly</span>
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 italic">Line chart would render here</p>
              </div>
            </ChartContainer>
          </div>
        </section>

        {/* Expense Breakdown */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Expense Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer title="Expense Breakdown" subtitle="Q4 2023">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  <PieChart className="w-4 h-4 inline mr-1" />
                  Total: $1,150,000
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 italic">Pie chart would render here</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-sm">Personnel (42%)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-sm">Operations (28%)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  <span className="text-sm">Marketing (15%)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span className="text-sm">R&D (10%)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  <span className="text-sm">Admin (5%)</span>
                </div>
              </div>
            </ChartContainer>

            <ChartContainer title="Industry Benchmarking" subtitle="Your company vs. Industry">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Personnel Expenses</span>
                    <span className="font-medium">42% vs. 45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 opacity-50">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Operations</span>
                    <span className="font-medium">28% vs. 25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 opacity-50">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Marketing Expenses</span>
                    <span className="font-medium">15% vs. 18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 opacity-50">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>R&D Expenses</span>
                    <span className="font-medium">10% vs. 8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 opacity-50">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "8%" }}></div>
                  </div>
                </div>
              </div>
            </ChartContainer>
          </div>
        </section>

        {/* Insights */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Statistical Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InsightCard
              title="Above-Average Growth Rate"
              description="Your revenue growth shows 15.3% YoY, which is statistically significant (p < 0.05) compared to the industry average of 8.7%."
              category="positive"
            />
            <InsightCard
              title="Expense Efficiency"
              description="Your expense-to-revenue ratio is 72.8%, which is 5.2% better than industry average, indicating superior operational efficiency."
              category="positive"
            />
            <InsightCard
              title="Profit Margin Volatility"
              description="Your profit margin has a higher standard deviation (±4.3%) compared to industry benchmark (±2.1%), suggesting potential instability."
              category="negative"
            />
            <InsightCard
              title="Marketing ROI Opportunity"
              description="Statistical analysis suggests marketing expenditure could be optimized for better returns, as your correlation between marketing spend and revenue (0.68) is below benchmark (0.82)."
              category="neutral"
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default EDADashboard;
