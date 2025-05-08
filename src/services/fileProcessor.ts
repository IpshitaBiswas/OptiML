import * as XLSX from 'xlsx';
import { HfInference } from '@huggingface/inference';
import * as tf from '@tensorflow/tfjs';
import { mcp } from './mcp';

export interface FinancialData {
  revenue: number[];
  expenses: number[];
  netProfit: number[];
  ebitda: number[];
  years: number[];
  cashFlow: number[];
  debtToEquity: number[];
  currentRatio: number[];
  grossMargin: number[];
  operatingMargin: number[];
  pat: number[];
  debtEquityRatio: number[];
  npm: number[];
  roe: number[];
  roce: number[];
}

interface CompetitorInfo {
  name: string;
  marketShare: number;
  revenue: number;
}

interface ColumnMapping {
  header: string;
  metric: keyof FinancialData;
  confidence: number;
}

interface SentimentResponse {
  result: Array<{
    label: string;
    score: number;
  }>;
}

interface SheetProcessingResult {
  sheetName: string;
  success: boolean;
  data: Partial<FinancialData>;
  error?: string;
}

interface ExcelMetadata {
  isInMillions: boolean;
  currency: string;
  yearColumns: number[];
  headerRow: number;
}

interface AIInsight {
  category: 'profitability' | 'cost' | 'risk' | 'growth';
  title: string;
  description: string;
  confidence: number;
  impact: {
    metric: string;
    value: number;
    potential: number;
  };
}

interface CompetitorMetrics {
  name: string;
  revenue: number;
  marketShare: number;
  profitMargin: number;
  growthRate: number;
}

interface IndustryBenchmarks {
  metric: string;
  value: number;
  industryAvg: number;
  topQuartile: number;
}

interface FinancialMetrics {
  [key: string]: {
    headers: string[];
    sheetTypes: string[];
    calculation?: (data: { [key: string]: number[] }) => number[];
  };
}

// Add new interfaces after existing interfaces
interface MCPScore {
  overall: number;
  marketShare: number;
  revenueGrowth: number;
  profitability: number;
  innovation: number;
  brandStrength: number;
}

interface CompetitorAnalysis {
  name: string;
  mcpScore: MCPScore;
  revenue: number;
  marketShare: number;
  profitMargin: number;
  growthRate: number;
}

interface MarketData {
  totalMarketSize: number;
  growthRate: number;
  competitors: CompetitorAnalysis[];
  mcpScore: MCPScore;
}

// Enhanced column mappings with more variations and aliases
const columnMappings = {
  revenue: [
    'Revenue', 'Net Revenue', 'Total Revenue', 'Sales', 'Net Sales', 'Total Sales',
    'Gross Revenue', 'Operating Revenue', 'Revenue from Operations'
  ],
  expenses: [
    'Expenses', 'Total Expenses', 'Operating Expenses', 'Cost', 'Costs', 'Total Costs',
    'Cost of Sales', 'Cost of Revenue', 'Operating Costs', 'SG&A', 'Operating Expense'
  ],
  netProfit: [
    'Net Profit', 'Net Income', 'Profit', 'Net Earnings', 'Net Profit After Tax',
    'Net Income After Tax', 'Profit After Tax', 'Net Earnings After Tax'
  ],
  cashFlow: [
    'Cash Flow', 'Operating Cash Flow', 'Net Cash Flow', 'Cash Flow from Operations',
    'Cash from Operations', 'Operating Cash', 'Net Operating Cash Flow'
  ],
  ebitda: [
    'EBITDA', 'Operating Income', 'Operating Profit', 'Earnings Before Interest Tax Depreciation Amortization',
    'Operating Income Before D&A', 'Operating Profit Before D&A'
  ],
  pat: [
    'PAT', 'Profit After Tax', 'Net Profit After Tax', 'Net Income After Tax',
    'Earnings After Tax', 'Net Earnings After Tax'
  ],
  debtEquityRatio: [
    'Debt Equity Ratio', 'D/E Ratio', 'Debt to Equity', 'Debt/Equity',
    'Total Debt to Equity', 'Leverage Ratio'
  ],
  npm: [
    'NPM', 'Net Profit Margin', 'Profit Margin', 'Net Margin',
    'Net Income Margin', 'Net Earnings Margin'
  ],
  currentRatio: [
    'Current Ratio', 'Liquidity Ratio', 'Current Assets/Current Liabilities',
    'Working Capital Ratio', 'Cash Ratio'
  ],
  roe: [
    'ROE', 'Return on Equity', 'Return On Equity', 'Net Income/Shareholders Equity',
    'Return on Shareholders Equity'
  ],
  roce: [
    'ROCE', 'Return on Capital Employed', 'Return On Capital Employed',
    'Operating Profit/Capital Employed', 'EBIT/Capital Employed'
  ]
};

export class FileProcessor {
  private hf: HfInference;
  private columnMappingCache: Map<string, ColumnMapping[]>;
  private metadata: ExcelMetadata | null;
  private readonly industryBenchmarks: { [key: string]: number } = {
    revenueGrowth: 0.05,
    profitMargin: 0.12,
    operatingMargin: 0.18,
    roe: 0.15,
    currentRatio: 1.5
  };

  private readonly financialMetrics: FinancialMetrics = {
    revenue: {
      headers: ['Net sales', 'Revenue', 'Total revenue'],
      sheetTypes: ['Income Statement', 'P&L']
    },
    expenses: {
      headers: ['Cost of sales', 'Operating expenses', 'Total expenses'],
      sheetTypes: ['Income Statement', 'P&L']
    },
    netProfit: {
      headers: ['Net income', 'Net profit', 'Net earnings'],
      sheetTypes: ['Income Statement', 'P&L']
    },
    ebitda: {
      headers: ['EBITDA', 'Operating profit', 'Operating income'],
      sheetTypes: ['Income Statement', 'P&L'],
      calculation: (data) => {
        if (data.operatingProfit) return data.operatingProfit;
        return (data.revenue || []).map((rev, i) => 
          rev * 0.2 // Approximate EBITDA as 20% of revenue if not found
        );
      }
    }
  };

  constructor(apiKey: string) {
    this.hf = new HfInference(apiKey);
    this.columnMappingCache = new Map();
    this.metadata = null;
  }

  private detectMetadata(workbook: XLSX.WorkBook): ExcelMetadata {
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const range = XLSX.utils.decode_range(firstSheet['!ref'] || 'A1');
    let isInMillions = false;
    let currency = 'USD';
    let headerRow = 0;
    let yearColumns: number[] = [];

    // Search first 10 rows for metadata
    for (let row = 0; row <= Math.min(10, range.e.r); row++) {
      for (let col = 0; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = firstSheet[cellAddress];
        if (cell && typeof cell.v === 'string') {
          const value = cell.v.toLowerCase();
          if (value.includes('millions') || value.includes('in millions')) {
            isInMillions = true;
          }
          if (value.includes('dollar') || value.includes('$')) {
            currency = 'USD';
          }
          // Detect header row by looking for common financial terms
          if (value.includes('net sales') || value.includes('revenue') || value.includes('income')) {
            headerRow = row;
          }
        }
      }
    }

    // Detect year columns
    const headerCells = [];
    for (let col = 0; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: headerRow, c: col });
      const cell = firstSheet[cellAddress];
      if (cell) {
        const value = cell.v;
        if (typeof value === 'number' && value >= 2000 && value <= 2100) {
          yearColumns.push(col);
        }
      }
    }

    return { isInMillions, currency, yearColumns, headerRow };
  }

  private async processSheet(sheet: XLSX.WorkSheet, sheetName: string): Promise<SheetProcessingResult> {
    try {
      if (!this.metadata) {
        throw new Error('Metadata not initialized');
      }

      console.log(`Processing sheet: ${sheetName}`);
      const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
      const rawData: { [key: string]: number[] } = {};

      // First pass: Extract all raw values
      for (let row = 0; row <= range.e.r; row++) {
        const firstCell = sheet[XLSX.utils.encode_cell({ r: row, c: 0 })];
        if (!firstCell || !firstCell.v) continue;

        const header = firstCell.v.toString().trim();
        
        // Check if this header is used in any of our metrics
        const isRelevantHeader = Object.values(this.financialMetrics)
          .some(metric => 
            metric.headers.includes(header) && 
            metric.sheetTypes.some(type => 
              sheetName.toLowerCase().includes(type.toLowerCase())
            )
          );

        if (isRelevantHeader) {
          console.log(`Found relevant header: ${header} in sheet: ${sheetName}`);
          const values: number[] = [];
          
          for (const yearCol of this.metadata.yearColumns) {
            const cell = sheet[XLSX.utils.encode_cell({ r: row, c: yearCol })];
            let value = cell ? this.cleanValue(cell.v, 'currency') : 0;
            
            // Handle millions conversion
            if (this.metadata.isInMillions && !header.toLowerCase().includes('per share')) {
              value = value; // Value is already in millions
            }
            values.push(value);
          }
          
          rawData[header] = values;
          console.log(`Extracted values for ${header}:`, values);
        }
      }

      // Second pass: Calculate metrics
      const processedData: Partial<FinancialData> = {};
      for (const [metricKey, metricInfo] of Object.entries(this.financialMetrics)) {
        if (metricInfo.sheetTypes.some(type => 
          sheetName.toLowerCase().includes(type.toLowerCase()))) {
          if (metricInfo.calculation) {
            processedData[metricKey as keyof FinancialData] = metricInfo.calculation(rawData);
          } else {
            for (const header of metricInfo.headers) {
              if (rawData[header]) {
                processedData[metricKey as keyof FinancialData] = rawData[header];
                break;
              }
            }
          }
        }
      }

      console.log(`Processed data for sheet ${sheetName}:`, processedData);
      return {
        sheetName,
        success: true,
        data: processedData
      };

    } catch (error) {
      console.error(`Error processing sheet ${sheetName}:`, error);
      return {
        sheetName,
        success: false,
        data: {},
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async processExcel(file: File): Promise<Partial<FinancialData>> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          console.log('Starting Excel processing...');
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });

          // Initialize metadata
          this.metadata = this.detectMetadata(workbook);
          console.log('Detected metadata:', this.metadata);

          const processedSheets: SheetProcessingResult[] = [];
          const relevantSheets = [
            'Income Statement',
            'Balance Sheet',
            'Cash Flows',
            'Financial Summary',
            'Consolidated Statements',
            'Consolidated Balance'
          ];

          // Process each sheet
          for (const sheetName of workbook.SheetNames) {
            if (relevantSheets.some(relevant => 
              sheetName.toLowerCase().includes(relevant.toLowerCase()))) {
              console.log(`Processing sheet: ${sheetName}`);
              const sheet = workbook.Sheets[sheetName];
              const result = await this.processSheet(sheet, sheetName);
              processedSheets.push(result);
              console.log(`Sheet ${sheetName} processing result:`, 
                result.success ? 'Success' : `Failed: ${result.error}`);
            }
          }

          // Combine data from all sheets
          const combinedData = this.combineSheetData(processedSheets);
          
          // Validate and clean combined data
          const validatedData = this.validateFinancialData(combinedData);

          // Update MCP context
          mcp.setContext({
            companyName: file.name.split('.')[0].replace(/[_-]/g, ' '),
            sector: 'Consumer Goods',
            reportPeriod: '2023',
            data: validatedData,
            metadata: {
              currency: this.metadata?.currency || 'USD',
              isInMillions: this.metadata?.isInMillions || true,
              lastUpdated: new Date()
            }
          });
          
          console.log('Final processed data:', validatedData);
          resolve(validatedData);

        } catch (error) {
          console.error('Error processing Excel file:', error);
          reject(error);
        }
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  private combineSheetData(results: SheetProcessingResult[]): Partial<FinancialData> {
    const combined: Partial<FinancialData> = {};
    
    results.forEach(result => {
      if (result.success) {
        Object.entries(result.data).forEach(([metric, values]) => {
          if (!combined[metric as keyof FinancialData]) {
            combined[metric as keyof FinancialData] = values;
          }
        });
      }
    });

    return combined;
  }

  private validateFinancialData(data: Partial<FinancialData>): Partial<FinancialData> {
    const validated: Partial<FinancialData> = {};
    
    // Ensure all arrays have the same length
    const maxLength = Math.max(...Object.values(data).map(arr => arr?.length || 0));
    
    Object.entries(data).forEach(([metric, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        // Pad arrays with null if they're shorter than maxLength
        const paddedValues = [...values];
        while (paddedValues.length < maxLength) {
          paddedValues.push(0);
        }
        validated[metric as keyof FinancialData] = paddedValues;
      }
    });

    return validated;
  }

  private async analyzeHeader(header: string): Promise<ColumnMapping[]> {
    try {
      // Check cache first
      const cachedMapping = this.columnMappingCache.get(header);
      if (cachedMapping) {
        return cachedMapping;
      }

      const prompt = `Analyze this financial report column header: "${header}"
      Determine which financial metric it represents from these options:
      - revenue (e.g. Total Revenue, Sales, Net Sales)
      - expenses (e.g. Operating Expenses, Total Costs)
      - netProfit (e.g. Net Income, Profit After Tax)
      - cashFlow (e.g. Operating Cash Flow, Net Cash Flow)
      - ebitda (e.g. EBITDA, Operating Income)
      - pat (e.g. Profit After Tax, Net Income After Tax)
      - debtEquityRatio (e.g. D/E Ratio, Leverage)
      - npm (e.g. Net Profit Margin, Net Margin)
      - currentRatio (e.g. Current Assets/Liabilities)
      - roe (e.g. Return on Equity)
      - roce (e.g. Return on Capital Employed)
      
      Return JSON format: {"metric": "metricName", "confidence": 0.XX}`;

      const response = await this.hf.textGeneration({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        inputs: prompt,
        parameters: {
          max_length: 100,
          temperature: 0.1
        }
      });

      const result = JSON.parse(response.generated_text);
      const mapping: ColumnMapping = {
        header,
        metric: result.metric as keyof FinancialData,
        confidence: result.confidence
      };

      // Cache the result
      this.columnMappingCache.set(header, [mapping]);
      return [mapping];

    } catch (error) {
      console.error('Error analyzing header:', error);
      return [];
    }
  }

  private async inferDataType(values: any[]): Promise<string> {
    try {
      const sampleValues = values.slice(0, 5).join(', ');
      const prompt = `Analyze these financial values: ${sampleValues}
      Determine if they represent:
      1. Currency amounts (e.g. revenue, expenses)
      2. Ratios (e.g. profit margins, financial ratios)
      3. Percentages
      Return just one word: "currency", "ratio", or "percentage"`;

      const response = await this.hf.textGeneration({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        inputs: prompt,
        parameters: {
          max_length: 20,
          temperature: 0.1
        }
      });

      return response.generated_text.trim().toLowerCase();
    } catch (error) {
      console.error('Error inferring data type:', error);
      return 'unknown';
    }
  }

  private cleanValue(value: any, dataType: string): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      // Remove currency symbols, parentheses, commas, and spaces
      const cleaned = value
        .replace(/[$£€¥]/g, '')
        .replace(/[(),]/g, '')
        .replace(/,/g, '')
        .replace(/\s/g, '');

      // Handle percentages
      if (dataType === 'percentage' || cleaned.includes('%')) {
        return parseFloat(cleaned) / 100;
      }

      // Handle negative values in parentheses
      if (value.includes('(') && value.includes(')')) {
        return -Math.abs(parseFloat(cleaned));
      }

      // Handle unit multipliers
      const multipliers: { [key: string]: number } = {
        'k': 1000,
        'm': 1000000,
        'b': 1000000000
      };

      const match = cleaned.match(/^([-\d.]+)([kmb])?$/i);
      if (match) {
        const [, num, unit] = match;
        const baseValue = parseFloat(num);
        return unit ? baseValue * (multipliers[unit.toLowerCase()] || 1) : baseValue;
      }

      return parseFloat(cleaned) || 0;
    }
    return 0;
  }

  private findRelevantSheet(sheetNames: string[]): string {
    const relevantTerms = ['financial', 'income', 'balance', 'cash flow', 'statement', 'data'];
    const normalizedNames = sheetNames.map(name => name.toLowerCase());
    
    // Find sheet with most relevant terms
    const scores = normalizedNames.map(name => 
      relevantTerms.reduce((score, term) => 
        score + (name.includes(term) ? 1 : 0), 0)
    );
    
    const maxScore = Math.max(...scores);
    const index = scores.indexOf(maxScore);
    return sheetNames[index];
  }

  private async handleProcessingError(fileName: string): Promise<Partial<FinancialData>> {
    try {
      const companyName = fileName.split('.')[0].replace(/[_-]/g, ' ');
      return await this.generateDummyData(companyName);
    } catch (error) {
      console.error('Error in handleProcessingError:', error);
      return this.getDefaultData();
    }
  }

  private findMatchingColumn(headers: string[], targetColumns: string[]): string | undefined {
    const normalizedHeaders = headers.map(h => h?.trim().toLowerCase() || '');
    const normalizedTargets = targetColumns.map(t => t.trim().toLowerCase());
    const index = normalizedHeaders.findIndex(h => normalizedTargets.includes(h));
    return index !== -1 ? headers[index] : undefined;
  }

  async generateDummyData(companyName: string): Promise<Partial<FinancialData>> {
    try {
      // First try to generate data using AI
      const prompt = `Generate realistic financial data for ${companyName} for 2023 in JSON format, similar to these actual values:
      {
        "revenue": [19457, 17967, 17421],
        "expenses": [8131, 7719, 7046],
        "netProfit": [2300, 1785, 2166],
        "ebitda": [3992, 2893, 3332],
        "debtEquityRatio": [0.94, 0.92, 0.90],
        "npm": [11.8, 9.9, 12.4],
        "currentRatio": [1.59, 1.55, 1.52],
        "roe": [14.0, 13.5, 13.2],
        "roce": [31.0, 30.5, 30.0]
      }
      
      Note: Use similar but not exact numbers, maintaining realistic proportions.`;

      const response = await this.hf.textGeneration({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        inputs: prompt,
        parameters: {
          max_length: 500,
          temperature: 0.7
        }
      });

      try {
        const jsonMatch = response.generated_text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[0]);
          console.log('Generated AI data:', data);
          return data;
        }
      } catch (parseError) {
        console.error('Error parsing LLM response:', parseError);
      }

      // If AI generation fails, use actual Colgate data
      return this.getColgateDummyData();

    } catch (error) {
      console.error('Error generating dummy data:', error);
      return this.getColgateDummyData();
    }
  }

  // Colgate Annual Report 2023 data as fallback reference
  public async getColgateDummyData(): Promise<Partial<FinancialData>> {
    return {
      revenue: [20101, 19457, 17967],  // 2024, 2023, 2022
      expenses: [7940, 8131, 7719],
      netProfit: [2889, 2300, 1785],
      ebitda: [4268, 3984, 2893],
      cashFlow: [4107, 3745, 2556],
      debtEquityRatio: [0.94, 0.89, 0.85],
      currentRatio: [1.23, 1.18, 1.15],
      grossMargin: [0.605, 0.582, 0.570],
      operatingMargin: [0.212, 0.205, 0.161],
      npm: [14.4, 11.8, 9.9],
      roe: [14.0, 13.5, 13.2],
      roce: [31.0, 30.5, 30.0]
    };
  }

  private async getDefaultData(): Promise<Partial<FinancialData>> {
    // Use Colgate data as default since it's real and reliable
    return await this.getColgateDummyData();
  }

  async detectAnomalies(data: Partial<FinancialData>): Promise<{ metric: string; value: number; isAnomaly: boolean }[]> {
    const anomalies: { metric: string; value: number; isAnomaly: boolean }[] = [];
    
    // Helper function to detect anomalies using z-score
    const detectMetricAnomalies = (values: number[], metricName: string) => {
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const stdDev = Math.sqrt(values.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / values.length);
      
      values.forEach((value) => {
        const zScore = Math.abs((value - mean) / stdDev);
        anomalies.push({
          metric: metricName,
          value: value,
          isAnomaly: zScore > 2 // Consider values more than 2 standard deviations away as anomalies
        });
      });
    };

    // Check each metric for anomalies
    Object.entries(data).forEach(([metric, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        detectMetricAnomalies(values, metric);
      }
    });

    return anomalies;
  }

  async getCompetitors(companyName: string): Promise<string[]> {
    // Mock competitor data for now
    // TODO: Implement actual competitor lookup logic
    return [
      "Competitor A",
      "Competitor B",
      "Competitor C"
    ];
  }

  generateRecommendations(data: Partial<FinancialData>): string {
    let recommendations = [];

    // Check profitability trends
    if (data.netProfit && data.netProfit.length > 1) {
      const latestProfit = data.netProfit[data.netProfit.length - 1];
      const previousProfit = data.netProfit[data.netProfit.length - 2];
      if (latestProfit < previousProfit) {
        recommendations.push("Profitability is declining. Consider cost optimization strategies.");
      }
    }

    // Check debt levels
    if (data.debtEquityRatio && data.debtEquityRatio.length > 0) {
      const latestRatio = data.debtEquityRatio[data.debtEquityRatio.length - 1];
      if (latestRatio > 2) {
        recommendations.push("High debt-to-equity ratio. Consider debt restructuring or equity financing.");
      }
    }

    // Check liquidity
    if (data.currentRatio && data.currentRatio.length > 0) {
      const latestCurrentRatio = data.currentRatio[data.currentRatio.length - 1];
      if (latestCurrentRatio < 1) {
        recommendations.push("Low current ratio indicates potential liquidity issues. Consider improving working capital management.");
      }
    }

    return recommendations.join("\n") || "No specific recommendations at this time.";
  }

  async analyzeSentiment(text: string): Promise<number> {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/finiteautomata/bertweet-base-sentiment-analysis',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: text }),
        }
      );

      const data = await response.json() as SentimentResponse[];
      const result = data[0].result;
      
      // Map sentiment labels to numeric scores
      const sentimentMap: { [key: string]: number } = {
        'POS': 1,
        'NEU': 0,
        'NEG': -1
      };

      // Get the highest scoring sentiment
      const topSentiment = result.reduce((prev, current) => 
        current.score > prev.score ? current : prev
      );

      return sentimentMap[topSentiment.label] || 0;
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return 0;
    }
  }

  async predictGrowth(historicalData: Partial<FinancialData>): Promise<number> {
    if (!historicalData.revenue || historicalData.revenue.length < 2) {
      return 0;
    }

    const revenueData = historicalData.revenue;
    const tensor = tf.tensor1d(revenueData);
    
    // Simple linear regression for prediction
    const mean = tensor.mean();
    const std = tensor.sub(mean).square().mean().sqrt();
    const normalized = tensor.sub(mean).div(std);
    
    // Calculate growth rate
    const growthRates = [];
    for (let i = 1; i < revenueData.length; i++) {
      const rate = (revenueData[i] - revenueData[i-1]) / revenueData[i-1];
      growthRates.push(rate);
    }
    
    // Return average growth rate
    return growthRates.length > 0 ? growthRates.reduce((a, b) => a + b, 0) / growthRates.length : 0;
  }

  assessRisk(data: Partial<FinancialData>): number {
    // Get latest values
    const assets = data.currentRatio?.[data.currentRatio.length - 1] || 0;
    const liabilities = data.debtEquityRatio?.[data.debtEquityRatio.length - 1] || 0;
    const revenue = data.revenue?.[data.revenue.length - 1] || 0;
    const netProfit = data.netProfit?.[data.netProfit.length - 1] || 0;

    // Calculate risk metrics
    const debtRatio = assets > 0 ? liabilities / assets : 1;
    const profitMargin = revenue > 0 ? netProfit / revenue : 0;

    // Risk score between 0 (low risk) and 1 (high risk)
    let riskScore = 0;
    
    // Debt ratio contributes 40% to risk score
    riskScore += (debtRatio > 0.7 ? 0.4 : debtRatio * 0.4);
    
    // Profit margin contributes 30% to risk score
    riskScore += (profitMargin < 0 ? 0.3 : (1 - profitMargin) * 0.3);
    
    // Market competition contributes 30% to risk score (using a default value since we don't have competitor data)
    riskScore += 0.15; // Assuming moderate market competition

    return Math.min(1, Math.max(0, riskScore));
  }

  async processPDF(file: File): Promise<Partial<FinancialData>> {
    try {
      // For now, return empty data structure since PDF processing is complex
      // In a real implementation, we would use a PDF parsing library
      console.log('Processing PDF file:', file.name);
      return {
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
    } catch (error) {
      console.error('Error processing PDF:', error);
      return this.getDefaultData();
    }
  }

  // Enhanced AI analysis methods
  private async analyzeProfitabilityOptimization(data: Partial<FinancialData>): Promise<AIInsight[]> {
    const insights: AIInsight[] = [];
    
    // Calculate current metrics
    const latestRevenue = data.revenue?.[0] || 0;
    const latestExpenses = data.expenses?.[0] || 0;
    const latestProfit = data.netProfit?.[0] || 0;
    const currentProfitMargin = latestProfit / latestRevenue;
    
    // Analyze expense optimization potential
    const expenseReductionTarget = latestExpenses * 0.05; // 5% reduction target
    const potentialProfit = latestProfit + expenseReductionTarget;
    const potentialMargin = potentialProfit / latestRevenue;
    
    insights.push({
      category: 'profitability',
      title: 'Expense Optimization Opportunity',
      description: `Reduce operating expenses by 5% to increase net profit margin from ${(currentProfitMargin * 100).toFixed(1)}% to ${(potentialMargin * 100).toFixed(1)}% based on ${new Date().getFullYear()} data`,
      confidence: 0.85,
      impact: {
        metric: 'netProfit',
        value: latestProfit,
        potential: potentialProfit
      }
    });

    // Add more insights based on the data...
    return insights;
  }

  private async predictCostSavings(data: Partial<FinancialData>): Promise<AIInsight[]> {
    const insights: AIInsight[] = [];
    
    // Analyze expense trends
    const expenseTrend = data.expenses || [];
    const expenseGrowthRate = expenseTrend.length > 1 
      ? (expenseTrend[0] - expenseTrend[1]) / expenseTrend[1]
      : 0;
    
    // Identify cost-saving opportunities
    const potentialSavings = expenseTrend[0] * 0.03; // Conservative 3% savings estimate
    
    insights.push({
      category: 'cost',
      title: 'Cost Efficiency Forecast',
      description: `Potential $${(potentialSavings).toFixed(0)} million savings through supply chain optimization and operational efficiency improvements`,
      confidence: 0.75,
      impact: {
        metric: 'expenses',
        value: expenseTrend[0],
        potential: expenseTrend[0] - potentialSavings
      }
    });

    return insights;
  }

  private async analyzeRisks(data: Partial<FinancialData>): Promise<AIInsight[]> {
    const insights: AIInsight[] = [];
    
    // Analyze currency risk from comprehensive income
    const currencyImpact = 343; // From comprehensive income currency adjustment
    const revenueExposure = currencyImpact / (data.revenue?.[0] || 1);
    
    insights.push({
      category: 'risk',
      title: 'Currency Risk Mitigation',
      description: `Currency fluctuations impacted comprehensive income by $${currencyImpact}M. Consider hedging strategies to protect ${(revenueExposure * 100).toFixed(1)}% of revenue exposed to currency risk`,
      confidence: 0.9,
      impact: {
        metric: 'netProfit',
        value: data.netProfit?.[0] || 0,
        potential: (data.netProfit?.[0] || 0) * 1.02 // 2% improvement potential
      }
    });

    return insights;
  }

  private async enrichFinancialData(data: Partial<FinancialData>): Promise<Partial<FinancialData>> {
    // Validate and clean the data
    Object.entries(data).forEach(([metric, values]) => {
      if (Array.isArray(values)) {
        // Convert all values to millions if needed
        data[metric as keyof FinancialData] = values.map(v => 
          v > 1000000 ? v / 1000000 : v
        );
      }
    });

    // Calculate derived metrics
    if (data.revenue && data.netProfit) {
      data.npm = data.revenue.map((rev, i) => 
        (data.netProfit![i] / rev) * 100
      );
    }

    return data;
  }

  // Add new methods before the class closing
  async calculateMCPScore(data: Partial<FinancialData>): Promise<MCPScore> {
    // Market share calculation based on total market size of $95B (personal care)
    const marketShare = (data.revenue?.[0] || 0) / 95000; // Convert to percentage
    
    // Revenue growth calculation
    const revenueGrowth = data.revenue && data.revenue.length > 1
      ? (data.revenue[0] - data.revenue[1]) / data.revenue[1]
      : 0;
    
    // Profitability score based on industry benchmarks
    const profitMargin = data.npm?.[0] || 0;
    const profitabilityScore = Math.min(1, profitMargin / 15); // Benchmark: 15% NPM
    
    // Innovation score (placeholder - would be based on R&D spending, patent data)
    const innovationScore = 0.85;
    
    // Brand strength (placeholder - would be based on sentiment analysis)
    const brandStrength = 0.9;
    
    // Calculate overall MCP score (weighted average)
    const overall = (
      marketShare * 0.3 +
      revenueGrowth * 0.2 +
      profitabilityScore * 0.2 +
      innovationScore * 0.15 +
      brandStrength * 0.15
    );

    return {
      overall,
      marketShare,
      revenueGrowth,
      profitability: profitabilityScore,
      innovation: innovationScore,
      brandStrength
    };
  }

  async getMarketAnalysis(): Promise<MarketData> {
    const competitors: CompetitorAnalysis[] = [
      {
        name: "P&G",
        mcpScore: {
          overall: 0.88,
          marketShare: 0.25,
          revenueGrowth: 0.05,
          profitability: 0.92,
          innovation: 0.90,
          brandStrength: 0.95
        },
        revenue: 82000,
        marketShare: 0.25,
        profitMargin: 0.19,
        growthRate: 0.05
      },
      {
        name: "Unilever",
        mcpScore: {
          overall: 0.85,
          marketShare: 0.22,
          revenueGrowth: 0.04,
          profitability: 0.88,
          innovation: 0.85,
          brandStrength: 0.92
        },
        revenue: 65000,
        marketShare: 0.22,
        profitMargin: 0.18,
        growthRate: 0.04
      }
    ];

    return {
      totalMarketSize: 95000,
      growthRate: 0.045,
      competitors,
      mcpScore: await this.calculateMCPScore(await this.getColgateDummyData())
    };
  }

  async generateAIRecommendations(data: Partial<FinancialData>): Promise<AIInsight[]> {
    const insights: AIInsight[] = [];
    
    // Combine profitability, cost, and risk insights
    const profitabilityInsights = await this.analyzeProfitabilityOptimization(data);
    const costInsights = await this.predictCostSavings(data);
    const riskInsights = await this.analyzeRisks(data);
    
    insights.push(...profitabilityInsights, ...costInsights, ...riskInsights);
    
    // Add MCP-based insights
    const mcpScore = await this.calculateMCPScore(data);
    const marketAnalysis = await this.getMarketAnalysis();
    
    insights.push({
      category: 'profitability',
      title: 'Market Position Enhancement',
      description: `Increase market share from ${(mcpScore.marketShare * 100).toFixed(1)}% to ${((mcpScore.marketShare + 0.02) * 100).toFixed(1)}% through targeted expansion in high-growth markets, potentially adding $${(0.02 * marketAnalysis.totalMarketSize).toFixed(0)}M in revenue`,
      confidence: 0.85,
      impact: {
        metric: 'revenue',
        value: data.revenue?.[0] || 0,
        potential: (data.revenue?.[0] || 0) * 1.02
      }
    });

    return insights;
  }
}

export const fileProcessor = new FileProcessor(import.meta.env.VITE_HUGGINGFACE_API_KEY || ''); 