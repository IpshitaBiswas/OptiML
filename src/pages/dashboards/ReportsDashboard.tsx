
import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ChartContainer from "../../components/dashboard/ChartContainer";
import { Check, Download, FileText, Share2 } from "lucide-react";

const ReportsDashboard = () => {
  // States for report customization
  const [selectedReportType, setSelectedReportType] = useState("comprehensive");
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [includeSections, setIncludeSections] = useState({
    financialAnalysis: true,
    competitorAnalysis: true,
    statisticalAnalysis: true,
    kpiComparison: true,
    aiInsights: true,
    recommendations: true,
  });

  // Toggle section inclusion
  const toggleSection = (section: keyof typeof includeSections) => {
    setIncludeSections({
      ...includeSections,
      [section]: !includeSections[section],
    });
  };

  // Handle report download (mock function)
  const handleDownloadReport = () => {
    // This would trigger the actual report generation and download in a real app
    console.log("Downloading report...", {
      type: selectedReportType,
      format: selectedFormat,
      sections: includeSections,
    });
    
    // Mock success message
    alert("Report successfully generated and downloaded!");
  };

  return (
    <DashboardLayout title="Reports Dashboard">
      <div className="space-y-8">
        {/* Report Templates */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className={`bg-white rounded-lg shadow-sm p-5 border-2 transition-colors cursor-pointer ${
                selectedReportType === "comprehensive" 
                  ? "border-optiml-purple" 
                  : "border-transparent hover:border-gray-200"
              }`}
              onClick={() => setSelectedReportType("comprehensive")}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-optiml-purple" />
                  <h3 className="font-semibold">Comprehensive Report</h3>
                </div>
                {selectedReportType === "comprehensive" && (
                  <div className="bg-optiml-purple text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Complete financial analysis with all metrics, competitor benchmarking, and AI recommendations
              </p>
              <div className="mt-4 text-sm text-gray-500">
                25-30 pages
              </div>
            </div>
            
            <div 
              className={`bg-white rounded-lg shadow-sm p-5 border-2 transition-colors cursor-pointer ${
                selectedReportType === "executive" 
                  ? "border-optiml-purple" 
                  : "border-transparent hover:border-gray-200"
              }`}
              onClick={() => setSelectedReportType("executive")}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-optiml-purple" />
                  <h3 className="font-semibold">Executive Summary</h3>
                </div>
                {selectedReportType === "executive" && (
                  <div className="bg-optiml-purple text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-600">
                High-level overview with key insights and recommendations for executive review
              </p>
              <div className="mt-4 text-sm text-gray-500">
                5-7 pages
              </div>
            </div>
            
            <div 
              className={`bg-white rounded-lg shadow-sm p-5 border-2 transition-colors cursor-pointer ${
                selectedReportType === "custom" 
                  ? "border-optiml-purple" 
                  : "border-transparent hover:border-gray-200"
              }`}
              onClick={() => setSelectedReportType("custom")}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-optiml-purple" />
                  <h3 className="font-semibold">Custom Report</h3>
                </div>
                {selectedReportType === "custom" && (
                  <div className="bg-optiml-purple text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Select specific sections and metrics to create a tailored report for your needs
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Variable length
              </div>
            </div>
          </div>
        </section>
        
        {/* Report Customization */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Report Customization</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Format Selection */}
            <ChartContainer title="Export Format">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${
                      selectedFormat === "pdf"
                        ? "bg-optiml-light border-optiml-purple text-optiml-purple"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedFormat("pdf")}
                  >
                    <p className="font-medium">PDF</p>
                  </div>
                  <div
                    className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${
                      selectedFormat === "excel"
                        ? "bg-optiml-light border-optiml-purple text-optiml-purple"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedFormat("excel")}
                  >
                    <p className="font-medium">Excel</p>
                  </div>
                  <div
                    className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${
                      selectedFormat === "ppt"
                        ? "bg-optiml-light border-optiml-purple text-optiml-purple"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedFormat("ppt")}
                  >
                    <p className="font-medium">PowerPoint</p>
                  </div>
                </div>
                
                <div className="mt-4 bg-blue-50 rounded p-3 text-sm text-blue-800">
                  <p className="font-medium">Format information:</p>
                  {selectedFormat === "pdf" && (
                    <p className="mt-1">PDF format includes all charts, tables, and analysis in a presentation-ready document.</p>
                  )}
                  {selectedFormat === "excel" && (
                    <p className="mt-1">Excel format includes raw data tables, metrics, and calculations for further analysis.</p>
                  )}
                  {selectedFormat === "ppt" && (
                    <p className="mt-1">PowerPoint format provides visual slides ready for presentation with key insights highlighted.</p>
                  )}
                </div>
              </div>
            </ChartContainer>
            
            {/* Section Selection */}
            <ChartContainer title="Include Sections">
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="financialAnalysis"
                    checked={includeSections.financialAnalysis}
                    onChange={() => toggleSection("financialAnalysis")}
                    className="h-4 w-4 text-optiml-purple rounded"
                  />
                  <label htmlFor="financialAnalysis" className="ml-2 text-gray-700">
                    Financial Analysis
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="competitorAnalysis"
                    checked={includeSections.competitorAnalysis}
                    onChange={() => toggleSection("competitorAnalysis")}
                    className="h-4 w-4 text-optiml-purple rounded"
                  />
                  <label htmlFor="competitorAnalysis" className="ml-2 text-gray-700">
                    Competitor Analysis
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="statisticalAnalysis"
                    checked={includeSections.statisticalAnalysis}
                    onChange={() => toggleSection("statisticalAnalysis")}
                    className="h-4 w-4 text-optiml-purple rounded"
                  />
                  <label htmlFor="statisticalAnalysis" className="ml-2 text-gray-700">
                    Statistical Analysis (EDA)
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="kpiComparison"
                    checked={includeSections.kpiComparison}
                    onChange={() => toggleSection("kpiComparison")}
                    className="h-4 w-4 text-optiml-purple rounded"
                  />
                  <label htmlFor="kpiComparison" className="ml-2 text-gray-700">
                    KPI Comparison
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="aiInsights"
                    checked={includeSections.aiInsights}
                    onChange={() => toggleSection("aiInsights")}
                    className="h-4 w-4 text-optiml-purple rounded"
                  />
                  <label htmlFor="aiInsights" className="ml-2 text-gray-700">
                    AI-Generated Insights
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="recommendations"
                    checked={includeSections.recommendations}
                    onChange={() => toggleSection("recommendations")}
                    className="h-4 w-4 text-optiml-purple rounded"
                  />
                  <label htmlFor="recommendations" className="ml-2 text-gray-700">
                    Recommendations & Action Plan
                  </label>
                </div>
              </div>
            </ChartContainer>
          </div>
        </section>
        
        {/* Report Preview */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Report Preview</h2>
          <ChartContainer title="Preview">
            <div className="bg-gray-50 rounded-lg min-h-[300px] flex flex-col items-center justify-center p-8">
              <FileText className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600">
                {selectedReportType === "comprehensive" && "Comprehensive Financial Analysis"}
                {selectedReportType === "executive" && "Executive Summary Report"}
                {selectedReportType === "custom" && "Custom Financial Report"}
              </h3>
              <p className="text-gray-500 mt-2 max-w-lg text-center">
                This report includes {Object.values(includeSections).filter(Boolean).length} sections
                with detailed analysis of your financial data compared to industry benchmarks.
              </p>
              
              <div className="mt-8 flex space-x-4">
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center bg-optiml-purple text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download {selectedFormat.toUpperCase()}
                </button>
                
                <button className="flex items-center border border-optiml-purple text-optiml-purple px-4 py-2 rounded hover:bg-optiml-light transition-colors">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Report
                </button>
              </div>
            </div>
          </ChartContainer>
        </section>
        
        {/* Previous Reports */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Previous Reports</h2>
          <ChartContainer title="Report History">
            <div className="divide-y">
              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Q4 2023 Comprehensive Report</h4>
                  <p className="text-sm text-gray-500">Generated on January 15, 2024</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-optiml-purple p-1">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-optiml-purple p-1">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Q3 2023 Executive Summary</h4>
                  <p className="text-sm text-gray-500">Generated on October 12, 2023</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-optiml-purple p-1">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-optiml-purple p-1">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Q2 2023 Custom Financial Report</h4>
                  <p className="text-sm text-gray-500">Generated on July 8, 2023</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-optiml-purple p-1">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-optiml-purple p-1">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Q1 2023 Comprehensive Report</h4>
                  <p className="text-sm text-gray-500">Generated on April 5, 2023</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-optiml-purple p-1">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-optiml-purple p-1">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </ChartContainer>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ReportsDashboard;
