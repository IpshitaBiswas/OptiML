
import { Check } from "lucide-react";

const WhyChoose = () => {
  const reasons = [
    {
      title: "Automated Analysis",
      description: "Save time with fully automated financial analysis powered by AI.",
    },
    {
      title: "Competitor Benchmarking",
      description: "Compare your performance with industry leaders and competitors.",
    },
    {
      title: "Profit Optimization",
      description: "Identify opportunities to increase revenue and reduce costs.",
    },
    {
      title: "Real-time Insights",
      description: "Get up-to-date analysis and recommendations as markets change.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-optiml-purple mb-12">
          Why Choose OptiML?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-green-100 p-1 rounded-full">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
