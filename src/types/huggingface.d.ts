declare module '@huggingface/inference' {
  export class HfInference {
    constructor(apiKey: string);
    
    textClassification(params: {
      model: string;
      inputs: string;
    }): Promise<Array<{
      label: string;
      score: number;
    }>>;
    
    textGeneration(params: {
      model: string;
      inputs: string;
      parameters?: {
        max_length?: number;
        temperature?: number;
      };
    }): Promise<{
      generated_text: string;
    }>;
  }
} 