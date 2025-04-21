import { FileUploadForm } from '../FileUploadForm';

const GetStartedForm = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Upload your company's annual report and financial statements to get started with our AI-powered analysis.
        </p>
      </div>
      
      <FileUploadForm />
      
      <div className="text-center text-sm text-gray-500">
        <p>Supported file formats: PDF for Annual Reports, Excel for Financial Statements</p>
      </div>
    </div>
  );
};

export default GetStartedForm;
