import { useState } from 'react';
import { useFinancialStore } from '../services/dataStore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

interface FormData {
  companyName: string;
  annualReport: File | null;
  financialStatement: File | null;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const FileUploadForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    annualReport: null,
    financialStatement: null
  });
  const { processFile, isLoading, error } = useFinancialStore();
  const navigate = useNavigate();

  const validateFiles = () => {
    if (!formData.companyName) {
      return 'Company name is required';
    }
    if (!formData.financialStatement) {
      return 'Financial statement is required';
    }
    if (formData.financialStatement.size > MAX_FILE_SIZE) {
      return 'Financial statement file size must be less than 50MB';
    }
    if (formData.annualReport && formData.annualReport.size > MAX_FILE_SIZE) {
      return 'Annual report file size must be less than 50MB';
    }
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Starting form submission...', formData);

    const validationError = validateFiles();
    if (validationError) {
      console.error('Validation error:', validationError);
      return;
    }

    try {
      // Store company name and set access token
      sessionStorage.setItem('companyName', formData.companyName);
      sessionStorage.setItem('accessToken', 'true'); // Grant immediate access
      sessionStorage.setItem('isAnalysisComplete', 'true'); // Set analysis as complete immediately
      console.log('Company name stored:', formData.companyName);
      console.log('Access token set');

      // Process the financial statement
      if (formData.financialStatement) {
        console.log('Processing financial statement:', formData.financialStatement.name);
        await processFile(formData.financialStatement);
        console.log('Financial statement processed successfully');
        
        // Navigate to dashboard immediately after processing
        navigate('/financial-dashboard');
      }
    } catch (error) {
      console.error('Error processing files:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'annualReport' | 'financialStatement') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [type]: file }));
    console.log(`${type} file selected:`, file?.name);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#5046e4] text-center mb-6">
        Get Started with OptiML
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <Input
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            placeholder="Enter your company name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5046e4]"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Annual Report (PDF)
            </label>
            <div className="relative">
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'annualReport')}
                className="hidden"
                id="annualReport"
              />
              <label
                htmlFor="annualReport"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5046e4]"
              >
                Choose file
              </label>
              <span className="ml-2 text-sm text-gray-500">
                {formData.annualReport?.name || 'No file chosen'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Financial Statements (Excel)
            </label>
            <div className="relative">
              <Input
                type="file"
                accept=".xlsx,.xls,.xlsm"
                onChange={(e) => handleFileChange(e, 'financialStatement')}
                className="hidden"
                id="financialStatement"
                required
              />
              <label
                htmlFor="financialStatement"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5046e4]"
              >
                Choose file
              </label>
              <span className="ml-2 text-sm text-gray-500">
                {formData.financialStatement?.name || 'No file chosen'}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#5046e4] hover:bg-[#4038b6] text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2"
        >
          <ArrowUp className="w-4 h-4" />
          {isLoading ? 'Processing...' : 'Submit for Analysis'}
        </Button>
      </form>
    </div>
  );
};

export default FileUploadForm; 