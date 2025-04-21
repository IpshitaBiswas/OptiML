import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fileProcessor } from './fileProcessor';

interface FinancialState {
  data: {
    revenue: number[];
    expenses: number[];
    netProfit: number[];
    cashFlow: number[];
    ebitda: number[];
    pat: number[];
    debtEquityRatio: number[];
    npm: number[];
    currentRatio: number[];
    roe: number[];
    roce: number[];
  } | null;
  competitors: string[];
  anomalies: { metric: string; value: number; isAnomaly: boolean }[];
  sentiment: { score: number; label: string } | null;
  recommendation: string | null;
  isLoading: boolean;
  error: string | null;
  setData: (data: any) => void;
  setCompetitors: (competitors: string[]) => void;
  setAnomalies: (anomalies: { metric: string; value: number; isAnomaly: boolean }[]) => void;
  setSentiment: (sentiment: { score: number; label: string }) => void;
  setRecommendation: (recommendation: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  processFiles: (pdfFile: File, excelFile: File, companyName: string) => Promise<void>;
  clearData: () => void;
}

export const useFinancialStore = create<FinancialState>()(
  persist(
    (set) => ({
      data: null,
      competitors: [],
      anomalies: [],
      sentiment: null,
      recommendation: null,
      isLoading: false,
      error: null,
      
      setData: (data) => set({ data }),
      setCompetitors: (competitors) => set({ competitors }),
      setAnomalies: (anomalies) => set({ anomalies }),
      setSentiment: (sentiment) => set({ sentiment }),
      setRecommendation: (recommendation) => set({ recommendation }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      processFiles: async (pdfFile, excelFile, companyName) => {
        try {
          console.log('Starting file processing in store...', { companyName });
          set({ isLoading: true, error: null });
          
          // Process PDF file
          console.log('Processing PDF file...');
          const pdfData = await fileProcessor.processPDF(pdfFile);
          console.log('PDF processing complete:', pdfData);
          
          // Process Excel file
          console.log('Processing Excel file...');
          const excelData = await fileProcessor.processExcel(excelFile);
          console.log('Excel processing complete:', excelData);
          
          // Combine data
          const combinedData = {
            ...pdfData,
            ...excelData
          };
          console.log('Data combined successfully');
          
          // Detect anomalies
          console.log('Detecting anomalies...');
          const anomalies = await fileProcessor.detectAnomalies(combinedData);
          console.log('Anomalies detected:', anomalies);
          
          // Get competitors
          console.log('Getting competitors...');
          const competitors = await fileProcessor.getCompetitors(companyName);
          console.log('Competitors retrieved:', competitors);
          
          // Generate recommendation
          console.log('Generating recommendations...');
          const recommendation = fileProcessor.generateRecommendations(combinedData);
          console.log('Recommendation generated:', recommendation);
          
          // Update state
          set({
            data: combinedData,
            competitors,
            anomalies,
            recommendation,
            isLoading: false,
            error: null
          });
          
          // Store in sessionStorage for access control
          sessionStorage.setItem('isAnalysisComplete', 'true');
          console.log('Processing complete, state updated');
          
        } catch (error) {
          console.error('Error in processFiles:', error);
          const errorMessage = error instanceof Error ? error.message : 'An error occurred during file processing';
          set({
            error: errorMessage,
            isLoading: false,
            data: null,
            competitors: [],
            anomalies: [],
            recommendation: null
          });
          throw new Error(errorMessage);
        }
      },
      
      clearData: () => {
        set({
          data: null,
          competitors: [],
          anomalies: [],
          sentiment: null,
          recommendation: null,
          error: null
        });
        sessionStorage.removeItem('isAnalysisComplete');
      }
    }),
    {
      name: 'financial-storage'
    }
  )
); 