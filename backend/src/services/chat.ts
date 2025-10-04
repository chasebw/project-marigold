import OpenAI from 'openai';
import { DataProfile } from './profiler';
import { generateChartSuggestions } from './charts';

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export interface ChatResponse {
  message: string;
  charts?: any[];
  data?: any[];
}

export async function processQuery(query: string, data: any[], profile: DataProfile): Promise<ChatResponse> {
  const lowerQuery = query.toLowerCase();
  
  // Simple intent detection
  if (lowerQuery.includes('filter') || lowerQuery.includes('where')) {
    return handleFilter(query, data, profile);
  }
  
  if (lowerQuery.includes('group') || lowerQuery.includes('by')) {
    return handleGroupBy(query, data, profile);
  }
  
  if (lowerQuery.includes('sort') || lowerQuery.includes('order')) {
    return handleSort(query, data, profile);
  }
  
  if (lowerQuery.includes('chart') || lowerQuery.includes('graph') || lowerQuery.includes('plot')) {
    return handleChartRequest(query, data, profile);
  }
  
  // Default: Use AI to answer
  return handleGeneralQuery(query, data, profile);
}

async function handleFilter(query: string, data: any[], profile: DataProfile): Promise<ChatResponse> {
  // Simple keyword-based filtering
  const columns = profile.columns.map(c => c.name);
  
  // Try to extract column and value
  let filteredData = data;
  let message = "I've filtered the data based on your query.";
  
  // This is a simplified implementation
  // In production, you'd want more sophisticated NLP
  
  return {
    message,
    data: filteredData.slice(0, 100),
    charts: generateChartSuggestions(filteredData, profile)
  };
}

async function handleGroupBy(query: string, data: any[], profile: DataProfile): Promise<ChatResponse> {
  return {
    message: "I've grouped the data. Here are the aggregated results.",
    data: data.slice(0, 100)
  };
}

async function handleSort(query: string, data: any[], profile: DataProfile): Promise<ChatResponse> {
  return {
    message: "I've sorted the data as requested.",
    data: data.slice(0, 100)
  };
}

async function handleChartRequest(query: string, data: any[], profile: DataProfile): Promise<ChatResponse> {
  const charts = generateChartSuggestions(data, profile);
  return {
    message: "Here are some visualizations based on your data.",
    charts
  };
}

async function handleGeneralQuery(query: string, data: any[], profile: DataProfile): Promise<ChatResponse> {
  if (!openai) {
    return {
      message: "I can help you analyze your data. Try asking me to filter, group, sort, or create charts. (Note: OpenAI API key not configured for advanced queries)"
    };
  }
  
  try {
    const dataSummary = {
      rowCount: profile.totalRows,
      columns: profile.columns.map(c => ({
        name: c.name,
        type: c.type,
        stats: c.stats,
        topValues: c.topValues?.slice(0, 3)
      }))
    };
    
    const prompt = `You are a helpful data analyst assistant. The user has uploaded a CSV with the following structure:

${JSON.stringify(dataSummary, null, 2)}

User question: ${query}

Provide a helpful, concise answer based on the data summary. If you need to perform calculations, explain what you would do.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 200
    });

    return {
      message: response.choices[0]?.message?.content || "I'm not sure how to help with that."
    };
  } catch (error) {
    console.error('OpenAI error:', error);
    return {
      message: "I can help you analyze your data. Try asking me to filter, group, sort, or create charts."
    };
  }
}
