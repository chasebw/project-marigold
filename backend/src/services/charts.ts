import { DataProfile } from './profiler';

export interface ChartSuggestion {
  id: string;
  type: 'bar' | 'line' | 'scatter' | 'pie' | 'histogram';
  title: string;
  xColumn?: string;
  yColumn?: string;
  data: any[];
  description: string;
}

export function generateChartSuggestions(data: any[], profile: DataProfile): ChartSuggestion[] {
  const suggestions: ChartSuggestion[] = [];
  const { columns } = profile;
  
  const numericCols = columns.filter(c => c.type === 'numeric');
  const categoricalCols = columns.filter(c => c.type === 'categorical');
  const dateCols = columns.filter(c => c.type === 'datetime');
  
  // Chart 1: Categorical + Numeric (Bar chart)
  if (categoricalCols.length > 0 && numericCols.length > 0) {
    const catCol = categoricalCols[0];
    const numCol = numericCols[0];
    
    // Aggregate data
    const aggregated = new Map<string, number>();
    data.forEach(row => {
      const key = String(row[catCol.name]);
      const value = Number(row[numCol.name]) || 0;
      aggregated.set(key, (aggregated.get(key) || 0) + value);
    });
    
    const chartData = Array.from(aggregated.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
    
    suggestions.push({
      id: 'chart-1',
      type: 'bar',
      title: `${numCol.name} by ${catCol.name}`,
      xColumn: catCol.name,
      yColumn: numCol.name,
      data: chartData,
      description: `Top categories by ${numCol.name}`
    });
  }
  
  // Chart 2: Time series (Line chart)
  if (dateCols.length > 0 && numericCols.length > 0) {
    const dateCol = dateCols[0];
    const numCol = numericCols[0];
    
    const chartData = data
      .map(row => ({
        date: row[dateCol.name],
        value: Number(row[numCol.name]) || 0
      }))
      .filter(d => d.date)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 100);
    
    suggestions.push({
      id: 'chart-2',
      type: 'line',
      title: `${numCol.name} over time`,
      xColumn: dateCol.name,
      yColumn: numCol.name,
      data: chartData,
      description: `Trend of ${numCol.name} over ${dateCol.name}`
    });
  }
  
  // Chart 3: Numeric distribution (Histogram)
  if (numericCols.length > 0) {
    const numCol = numericCols[0];
    const values = data
      .map(row => Number(row[numCol.name]))
      .filter(v => !isNaN(v));
    
    if (values.length > 0) {
      const min = Math.min(...values);
      const max = Math.max(...values);
      const binCount = 20;
      const binSize = (max - min) / binCount;
      
      const bins = Array(binCount).fill(0);
      values.forEach(v => {
        const binIndex = Math.min(Math.floor((v - min) / binSize), binCount - 1);
        bins[binIndex]++;
      });
      
      const chartData = bins.map((count, i) => ({
        range: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
        count
      }));
      
      suggestions.push({
        id: 'chart-3',
        type: 'histogram',
        title: `Distribution of ${numCol.name}`,
        xColumn: numCol.name,
        data: chartData,
        description: `Frequency distribution showing the spread of ${numCol.name} values`
      });
    }
  }
  
  // Chart 4: Scatter plot for numeric correlations
  if (numericCols.length >= 2) {
    const xCol = numericCols[0];
    const yCol = numericCols[1];
    
    const chartData = data
      .map(row => ({
        x: Number(row[xCol.name]),
        y: Number(row[yCol.name])
      }))
      .filter(d => !isNaN(d.x) && !isNaN(d.y))
      .slice(0, 500);
    
    suggestions.push({
      id: 'chart-4',
      type: 'scatter',
      title: `${yCol.name} vs ${xCol.name}`,
      xColumn: xCol.name,
      yColumn: yCol.name,
      data: chartData,
      description: `Relationship between ${xCol.name} and ${yCol.name}`
    });
  }
  
  return suggestions.slice(0, 3);
}
