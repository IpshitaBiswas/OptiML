
import { ArrowUp, BarChart2, Brain, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <ArrowUp className="w-12 h-12 text-optiml-purple" />,
      title: "Upload Your Reports",
      description: "Securely upload your financial documents and reports",
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-optiml-purple" />,
      title: "AI Analysis",
      description: "Our advanced AI analyzes your data in real-time",
    },
    {
      icon: <Brain className="w-12 h-12 text-optiml-purple" />,
      title: "Get Actionable Insights",
      description: "Receive detailed, data-driven recommendations",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-optiml-purple" />,
      title: "Implement & Grow",
      description: "Apply insights to optimize your financial performance",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-optiml-purple mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
