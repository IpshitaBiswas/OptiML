import * as XLSX from 'xlsx';
import { HfInference } from '@huggingface/inference';

interface FinancialData {
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
}

class FileProcessor {
  private hf: HfInference;

  constructor() {
    this.hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);
  }

  async processPDF(file: File): Promise<FinancialData> {
    // For PDF processing, we'll use a simple text extraction approach
    const text = await file.text();
    const data: FinancialData = {
      revenue: [],
      expenses: [],
      netProfit: [],
      cashFlow: [],
      ebitda: [],
      pat: [],
      debtEquityRatio: [],
      npm: [],
      currentRatio: [],
      roe: [],
      roce: []
    };

    // Extract data using regex patterns
    const revenueMatch = text.match(/Revenue\s*:\s*\$?([\d,]+\.?\d*)/i);
    const expensesMatch = text.match(/Expenses\s*:\s*\$?([\d,]+\.?\d*)/i);
    const netProfitMatch = text.match(/Net Profit\s*:\s*\$?([\d,]+\.?\d*)/i);
    
    if (revenueMatch) data.revenue.push(parseFloat(revenueMatch[1].replace(/,/g, '')));
    if (expensesMatch) data.expenses.push(parseFloat(expensesMatch[1].replace(/,/g, '')));
    if (netProfitMatch) data.netProfit.push(parseFloat(netProfitMatch[1].replace(/,/g, '')));

    return data;
  }

  async processExcel(file: File): Promise<FinancialData> {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    const data: FinancialData = {
      revenue: [],
      expenses: [],
      netProfit: [],
      cashFlow: [],
      ebitda: [],
      pat: [],
      debtEquityRatio: [],
      npm: [],
      currentRatio: [],
      roe: [],
      roce: []
    };

    // Process each row of data
    jsonData.forEach((row: any) => {
      if (row.Revenue) data.revenue.push(Number(row.Revenue));
      if (row.Expenses) data.expenses.push(Number(row.Expenses));
      if (row['Net Profit']) data.netProfit.push(Number(row['Net Profit']));
      if (row['Cash Flow']) data.cashFlow.push(Number(row['Cash Flow']));
      if (row.EBITDA) data.ebitda.push(Number(row.EBITDA));
      if (row.PAT) data.pat.push(Number(row.PAT));
      if (row['Debt/Equity Ratio']) data.debtEquityRatio.push(Number(row['Debt/Equity Ratio']));
      if (row.NPM) data.npm.push(Number(row.NPM));
      if (row['Current Ratio']) data.currentRatio.push(Number(row['Current Ratio']));
      if (row.ROE) data.roe.push(Number(row.ROE));
      if (row.ROCE) data.roce.push(Number(row.ROCE));
    });

    return data;
  }

  async detectAnomalies(data: FinancialData): Promise<{ metric: string; value: number; isAnomaly: boolean }[]> {
    const anomalies: { metric: string; value: number; isAnomaly: boolean }[] = [];
    
    // Simple anomaly detection using standard deviation
    for (const [metric, values] of Object.entries(data)) {
      if (values.length < 2) continue;
      
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const stdDev = Math.sqrt(
        values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length
      );
      
      values.forEach((value) => {
        const zScore = Math.abs((value - mean) / stdDev);
        if (zScore > 2) { // Consider values more than 2 standard deviations away as anomalies
          anomalies.push({ metric, value, isAnomaly: true });
        }
      });
    }
    
    return anomalies;
  }

  async analyzeSentiment(text: string): Promise<{ score: number; label: string }> {
    const result = await this.hf.textClassification({
      model: 'distilbert-base-uncased-finetuned-sst-2-english',
      inputs: text
    });
    
    return {
      score: result[0].score,
      label: result[0].label
    };
  }

  async getCompetitors(companyName: string): Promise<string[]> {
    try {
      const prompt = `Task: Identify the top 3 competitors for ${companyName} in the financial sector.
Format the response as a comma-separated list of company names only.
Example format: "Company1, Company2, Company3"
Response:`;

      const result = await this.hf.textGeneration({
        model: 'gpt2',
        inputs: prompt,
        parameters: {
          max_length: 50,
          temperature: 0.7
        }
      });

      // Parse the response and extract company names
      const competitors = result.generated_text
        .split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0)
        .slice(0, 3);

      // If we don't get enough competitors, add placeholder names
      while (competitors.length < 3) {
        competitors.push(`Competitor ${competitors.length + 1}`);
      }

      return competitors;
    } catch (error) {
      console.error('Error getting competitors:', error);
      // Return placeholder competitors if the API call fails
      return ['Competitor A', 'Competitor B', 'Competitor C'];
    }
  }

  generateRecommendations(data: FinancialData): string {
    // Simple recommendation engine based on financial ratios
    const recommendations: string[] = [];
    
    if (data.debtEquityRatio[data.debtEquityRatio.length - 1] > 2) {
      recommendations.push('Consider reducing debt levels to improve financial stability');
    }
    
    if (data.npm[data.npm.length - 1] < 0.1) {
      recommendations.push('Focus on cost optimization to improve net profit margin');
    }
    
    if (data.currentRatio[data.currentRatio.length - 1] < 1) {
      recommendations.push('Improve working capital management to enhance liquidity');
    }
    
    return recommendations[0] || 'Maintain current operational efficiency';
  }
}

export const fileProcessor = new FileProcessor(); 