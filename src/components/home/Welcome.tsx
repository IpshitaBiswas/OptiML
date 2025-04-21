
const Welcome = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-optiml-purple mb-8">
          Welcome to OptiML
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-700">
              OptiML delivers tailored, AI-powered financial recommendations that are fast, cost-effective, 
              and designed to align with your company's unique needs. Our machine learning algorithms analyze 
              your financial data in real-time, offering precise, actionable insights to help you adapt quickly 
              and drive growth in a dynamic market.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Financial Analysis" 
              className="rounded-lg shadow-md max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
