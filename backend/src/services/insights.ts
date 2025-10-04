import OpenAI from 'openai';
import { DataProfile } from './profiler';

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateInsights(data: any[], profile: DataProfile): Promise<string> {
  // Generate statistical insights
  const stats = generateStatisticalInsights(profile);
  
  // If OpenAI is configured, enhance with AI
  if (openai) {
    try {
      const prompt = `You are a data analyst. Given the following data summary, provide 3-5 key insights in a concise paragraph. Focus on trends, patterns, and actionable observations.

Data Summary:
- Total rows: ${profile.totalRows}
- Columns: ${profile.columns.length}

Column Details:
${profile.columns.map(col => {
  let detail = `- ${col.name} (${col.type}): ${col.uniqueCount} unique values`;
  if (col.stats) {
    detail += `, mean: ${col.stats.mean?.toFixed(2)}, range: ${col.stats.min?.toFixed(2)}-${col.stats.max?.toFixed(2)}`;
  }
  if (col.topValues && col.topValues.length > 0) {
    detail += `, top value: ${col.topValues[0].value} (${col.topValues[0].count} occurrences)`;
  }
  return detail;
}).join('\n')}

Statistical Insights:
${stats}

Provide insights in a natural, conversational tone.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 300
      });

      return response.choices[0]?.message?.content || stats;
    } catch (error) {
      console.error('OpenAI error:', error);
      return stats;
    }
  }
  
  return stats;
}

function generateStatisticalInsights(profile: DataProfile): string {
  const insights: string[] = [];
  
  insights.push(`Dataset contains ${profile.totalRows} rows and ${profile.columns.length} columns.`);
  
  const numericCols = profile.columns.filter(c => c.type === 'numeric');
  const categoricalCols = profile.columns.filter(c => c.type === 'categorical');
  
  if (numericCols.length > 0) {
    const col = numericCols[0];
    if (col.stats) {
      insights.push(`${col.name} ranges from ${col.stats.min?.toFixed(2)} to ${col.stats.max?.toFixed(2)} with an average of ${col.stats.mean?.toFixed(2)}.`);
    }
  }
  
  if (categoricalCols.length > 0) {
    const col = categoricalCols[0];
    if (col.topValues && col.topValues.length > 0) {
      insights.push(`Most common ${col.name}: ${col.topValues[0].value} (${((col.topValues[0].count / profile.totalRows) * 100).toFixed(1)}% of records).`);
    }
  }
  
  const missingData = profile.columns.filter(c => c.missingPercent > 10);
  if (missingData.length > 0) {
    insights.push(`Note: ${missingData.map(c => c.name).join(', ')} have significant missing values.`);
  }
  
  return insights.join(' ');
}
