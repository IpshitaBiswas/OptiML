
import { BarChart2, PieChart, LineChart, BarChart, Brain, FileText } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <BarChart2 className="w-10 h-10 text-optiml-purple" />,
      title: "Financial Analysis",
      description: "Comprehensive assessment of your financial statements and position.",
    },
    {
      icon: <PieChart className="w-10 h-10 text-optiml-purple" />,
      title: "EDA Dashboard",
      description: "Exploratory data analysis to uncover patterns and trends in your finances.",
    },
    {
      icon: <LineChart className="w-10 h-10 text-optiml-purple" />,
      title: "Competitor Analysis",
      description: "Benchmarking against industry competitors to identify opportunities.",
    },
    {
      icon: <BarChart className="w-10 h-10 text-optiml-purple" />,
      title: "KPI Comparisons",
      description: "Track and compare your key performance indicators over time.",
    },
    {
      icon: <Brain className="w-10 h-10 text-optiml-purple" />,
      title: "AI Insights",
      description: "Machine learning powered recommendations for financial improvement.",
    },
    {
      icon: <FileText className="w-10 h-10 text-optiml-purple" />,
      title: "Exportable Reports",
      description: "Download and share professional financial reports and analyses.",
    },
  ];

  return (
    <section id="services" className="py-16 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-optiml-purple mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
