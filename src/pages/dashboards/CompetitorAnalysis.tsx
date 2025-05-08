import { useFinancialStore } from '@/services/dataStore';
import { Card } from '@/components/ui/card';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { BarChart, LineChart, RadarChart, Bar, Line, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const ComparisonCard = ({ title, company, competitor, metric }: { title: string; company: string; competitor: string; metric: string }) => (
  <Card className="p-4 bg-white/50 backdrop-blur-sm">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <div className="flex justify-between items-center mt-2">
      <div>
        <p className="text-sm text-gray-600">Colgate</p>
        <p className="text-xl font-bold text-[#5046e4]">{company}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600">Industry Avg</p>
        <p className="text-xl font-bold text-gray-600">{competitor}</p>
      </div>
    </div>
    <p className="text-sm text-gray-500 mt-2">{metric}</p>
  </Card>
);

const CompetitorAnalysis = () => {
  const { data, getInsights } = useFinancialStore();
  const insights = getInsights('competitor');

  const currentRevenue = typeof data?.revenue === 'number' ? data.revenue : 0;
  const currentMarketShare = typeof data?.marketShare === 'number' ? data.marketShare : 0;
  const currentProfit = typeof data?.netProfit === 'number' ? data.netProfit : 0;

  const marketShareData = [
    { name: 'Colgate', share: currentMarketShare },
    { name: 'Competitor A', share: currentMarketShare * 0.8 },
    { name: 'Competitor B', share: currentMarketShare * 0.7 },
    { name: 'Competitor C', share: currentMarketShare * 0.5 },
    { name: 'Others', share: 100 - (currentMarketShare * 3) },
  ];

  const performanceMetrics = [
    { metric: 'Revenue Growth', company: 5.2, industry: 4.1 },
    { metric: 'Profit Margin', company: 11.8, industry: 10.2 },
    { metric: 'Market Share', company: currentMarketShare, industry: currentMarketShare * 0.8 },
    { metric: 'ROE', company: 14.0, industry: 12.5 },
  ];

  const competitiveStrength = [
    { subject: 'Market Share', A: currentMarketShare, B: currentMarketShare * 0.8 },
    { subject: 'Brand Strength', A: 85, B: 75 },
    { subject: 'Innovation', A: 80, B: 70 },
    { subject: 'Distribution', A: 90, B: 85 },
    { subject: 'Price Position', A: 75, B: 80 },
  ];

  const revenueComparison = [
    { year: '2019', colgate: currentRevenue * 0.85, competitor: currentRevenue * 0.75 },
    { year: '2020', colgate: currentRevenue * 0.90, competitor: currentRevenue * 0.82 },
    { year: '2021', colgate: currentRevenue * 0.95, competitor: currentRevenue * 0.88 },
    { year: '2022', colgate: currentRevenue * 0.98, competitor: currentRevenue * 0.92 },
    { year: '2023', colgate: currentRevenue, competitor: currentRevenue * 0.95 },
  ];

  return (
    <DashboardLayout title="Competitor Analysis">
      <div className="p-6 space-y-6 bg-gradient-to-br from-[#eee3fb] to-[#c3cffb] min-h-screen">
        <h1 className="text-3xl font-bold text-[#5046e4] mb-8">Competitor Analysis</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ComparisonCard 
            title="Market Share" 
            company={`${currentMarketShare}%`}
            competitor={`${(currentMarketShare * 0.8).toFixed(1)}%`}
            metric="Leading market position"
          />
          <ComparisonCard 
            title="Revenue Growth" 
            company="+5.2%" 
            competitor="+4.1%"
            metric="Above industry average"
          />
          <ComparisonCard 
            title="Profit Margin" 
            company="11.8%" 
            competitor="10.2%"
            metric="Strong profitability"
          />
          <ComparisonCard 
            title="ROE" 
            company="14.0%" 
            competitor="12.5%"
            metric="Efficient capital use"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-[#5046e4]">Market Share Distribution</h3>
            <BarChart width={400} height={300} data={marketShareData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="share" fill="#5046e4" name="Market Share %" />
            </BarChart>
          </Card>

          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-[#5046e4]">Performance Comparison</h3>
            <BarChart width={400} height={300} data={performanceMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="company" fill="#5046e4" name="Colgate" />
              <Bar dataKey="industry" fill="#82ca9d" name="Industry" />
            </BarChart>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-[#5046e4]">Competitive Strength Analysis</h3>
            <RadarChart width={400} height={300} data={competitiveStrength}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Colgate" dataKey="A" stroke="#5046e4" fill="#5046e4" fillOpacity={0.6} />
              <Radar name="Industry" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </Card>

          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-[#5046e4]">Revenue Trend Comparison</h3>
            <LineChart width={400} height={300} data={revenueComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="colgate" stroke="#5046e4" name="Colgate" />
              <Line type="monotone" dataKey="competitor" stroke="#82ca9d" name="Top Competitor" />
            </LineChart>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2 text-[#5046e4]">Competitive Analysis</h3>
            <p className="text-gray-700 mb-2">{insights.summary}</p>
            <p className="text-gray-700 mb-2">{insights.diagnosis}</p>
          </Card>
          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2 text-[#5046e4]">Strategic Recommendations</h3>
            <p className="text-gray-700 mb-2">{insights.solutions}</p>
            <p className="text-gray-700">{insights.profitability}</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompetitorAnalysis;
