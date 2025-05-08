import FileUploadForm from "./FileUploadForm";

const GetStartedForm = () => {
  return (
    <div className="min-h-screen bg-[#5046e4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Our AI-powered platform will analyze your financial data, identify key areas of improvement, benchmark against competitors, and provide tailored, data-driven strategies to enhance profitability.
          </p>
        </div>
        <FileUploadForm />
      </div>
    </div>
  );
};

export default GetStartedForm; 