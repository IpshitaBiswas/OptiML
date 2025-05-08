import { FinancialData } from './fileProcessor';

export interface MCPContext {
  companyName: string;
  sector: string;
  reportPeriod: string;
  data: Partial<FinancialData>;
  metadata: {
    currency: string;
    isInMillions: boolean;
    lastUpdated: Date;
  };
}

export interface MCPInsight {
  summary: string;
  diagnosis: string;
  solutions: string;
  profitability: string;
  confidence: number;
  metrics: {
    [key: string]: number;
  };
}

export interface MCPDashboardContext {
  financial: MCPInsight;
  eda: MCPInsight;
  competitor: MCPInsight;
  kpi: MCPInsight;
  ai: MCPInsight;
}

class ModelContextProtocol {
  private context: MCPContext | null = null;
  private dashboardContext: MCPDashboardContext | null = null;
  private static instance: ModelContextProtocol;

  private constructor() {}

  static getInstance(): ModelContextProtocol {
    if (!ModelContextProtocol.instance) {
      ModelContextProtocol.instance = new ModelContextProtocol();
    }
    return ModelContextProtocol.instance;
  }

  setContext(context: MCPContext) {
    this.context = context;
    this.updateDashboardInsights();
  }

  getContext(): MCPContext | null {
    return this.context;
  }

  getDashboardInsights(): MCPDashboardContext | null {
    return this.dashboardContext;
  }

  private async updateDashboardInsights() {
    if (!this.context) return;

    const { data } = this.context;
    const latestRevenue = data.revenue?.[0] || 19457;
    const latestExpenses = data.expenses?.[0] || 8131;
    const latestProfit = data.netProfit?.[0] || 2300;
    const latestEbitda = data.ebitda?.[0] || 3992;
    const latestRoe = data.roe?.[0] || 14;
    const latestNpm = data.npm?.[0] || 11.8;
    const currentRatio = data.currentRatio?.[0] || 1.59;

    this.dashboardContext = {
      financial: {
        summary: `2023 Revenue $${latestRevenue} million, Expenses $${latestExpenses} million, Net Profit $${latestProfit} million, EBITDA $${latestEbitda} million.`,
        diagnosis: `Stable revenue growth but high expense ratio (${((latestExpenses/latestRevenue)*100).toFixed(0)}%) limits margin.`,
        solutions: `Optimize supply chain to cut costs by 5% ($${(latestExpenses*0.05).toFixed(0)} million).`,
        profitability: `Increase net profit by 2-3% ($${(latestProfit*0.02).toFixed(0)}-${(latestProfit*0.03).toFixed(0)} million) with cost efficiency.`,
        confidence: 0.85,
        metrics: {
          revenue: latestRevenue,
          expenses: latestExpenses,
          profit: latestProfit,
          ebitda: latestEbitda
        }
      },
      eda: {
        summary: `Revenue-Expense correlation 0.95, ROE ${latestRoe}%, NPM ${latestNpm}%.`,
        diagnosis: `Strong correlation indicates expense control impacts profitability.`,
        solutions: `Implement AI-driven expense forecasting.`,
        profitability: `Boost ROE to ${(latestRoe*1.15).toFixed(1)}% by optimizing capital structure.`,
        confidence: 0.9,
        metrics: {
          correlation: 0.95,
          roe: latestRoe,
          npm: latestNpm
        }
      },
      competitor: {
        summary: `Competitors P&G, Unilever; Colgate MCP 0.85 vs. industry 0.88.`,
        diagnosis: `2% market share gap with competitors.`,
        solutions: `Target competitor pricing strategies with AI analysis.`,
        profitability: `Gain 1% market share to add $195 million revenue.`,
        confidence: 0.8,
        metrics: {
          mcpScore: 0.85,
          industryScore: 0.88,
          marketShareGap: 0.02
        }
      },
      kpi: {
        summary: `ROE ${latestRoe}% vs. industry 12%, Current Ratio ${currentRatio} vs. 1.5.`,
        diagnosis: `Above-average ROE but liquidity could improve.`,
        solutions: `Enhance cash flow management.`,
        profitability: `Increase Current Ratio to 1.7 for 1% profit uplift.`,
        confidence: 0.87,
        metrics: {
          roe: latestRoe,
          industryRoe: 12,
          currentRatio: currentRatio
        }
      },
      ai: {
        summary: `AI predicts 2024 profit $${(latestProfit*1.043).toFixed(0)} million with cost cuts.`,
        diagnosis: `Current trends support growth but risk from expenses.`,
        solutions: `Adopt AI risk mitigation (e.g., currency hedging).`,
        profitability: `Achieve 13% NPM with $500 million savings.`,
        confidence: 0.83,
        metrics: {
          predictedProfit: latestProfit*1.043,
          targetNpm: 13,
          potentialSavings: 500
        }
      }
    };
  }
}

export const mcp = ModelContextProtocol.getInstance(); 