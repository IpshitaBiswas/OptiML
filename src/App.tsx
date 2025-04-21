
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import FinancialDashboard from "./pages/dashboards/FinancialDashboard";
import EDADashboard from "./pages/dashboards/EDADashboard";
import CompetitorAnalysis from "./pages/dashboards/CompetitorAnalysis";
import KPIComparison from "./pages/dashboards/KPIComparison";
import AIInsights from "./pages/dashboards/AIInsights";
import ReportsDashboard from "./pages/dashboards/ReportsDashboard";

const queryClient = new QueryClient();

// Authentication check for protected routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAnalysisComplete = sessionStorage.getItem("isAnalysisComplete") === "true";
  
  if (!isAnalysisComplete) {
    return <AccessDeniedPage />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Dashboard Routes - Protected */}
          <Route 
            path="/financial-dashboard" 
            element={
              <ProtectedRoute>
                <FinancialDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/eda-dashboard" 
            element={
              <ProtectedRoute>
                <EDADashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/competitor-analysis" 
            element={
              <ProtectedRoute>
                <CompetitorAnalysis />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/kpi-comparison" 
            element={
              <ProtectedRoute>
                <KPIComparison />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ai-insights" 
            element={
              <ProtectedRoute>
                <AIInsights />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute>
                <ReportsDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
