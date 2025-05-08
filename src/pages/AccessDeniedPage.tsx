import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFinancialStore } from "../services/dataStore";

const AccessDeniedPage = () => {
  const navigate = useNavigate();
  const { isLoading, processingStatus } = useFinancialStore();

  useEffect(() => {
    // Check if analysis is in progress
    if (isLoading || processingStatus.stage !== 'idle') {
      return;
    }

    // After 3 seconds, redirect to home page
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, isLoading, processingStatus]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#eee3fb] to-[#c3cffb]">
      <div className="text-center max-w-md px-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-full inline-flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          {isLoading || processingStatus.stage !== 'idle' 
            ? "Your files are being processed. Please wait..."
            : "Please submit your company details and documents to access the dashboard."}
        </p>
        {isLoading || processingStatus.stage !== 'idle' ? (
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-optiml-purple h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${processingStatus.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">{processingStatus.message}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-8">
            You will be redirected to the home page in a few seconds...
          </p>
        )}
        <Link
          to="/"
          className="bg-optiml-purple text-white px-6 py-3 rounded-md font-medium hover:bg-purple-800 transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
