export interface ColumnProfile {
  name: string;
  type: 'numeric' | 'categorical' | 'datetime' | 'text';
  missingCount: number;
  missingPercent: number;
  uniqueCount: number;
  cardinality: 'low' | 'medium' | 'high';
  stats?: {
    min?: number;
    max?: number;
    mean?: number;
    median?: number;
    std?: number;
  };
  topValues?: Array<{ value: any; count: number }>;
}

export interface DataProfile {
  columns: ColumnProfile[];
  totalRows: number;
}

export function profileData(data: any[], headers: string[]): DataProfile {
  const totalRows = data.length;
  
  const columns: ColumnProfile[] = headers.map(header => {
    const values = data.map(row => row[header]).filter(v => v !== null && v !== undefined && v !== '');
    const allValues = data.map(row => row[header]);
    const missingCount = totalRows - values.length;
    const uniqueCount = new Set(values).size;
    
    // Determine type
    const numericValues = values.filter(v => typeof v === 'number' && !isNaN(v));
    const isNumeric = numericValues.length > values.length * 0.8;
    
    const datePattern = /^\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{2,4}/;
    const isDate = values.length > 0 && 
      values.filter(v => typeof v === 'string' && datePattern.test(v)).length > values.length * 0.8;
    
    let type: ColumnProfile['type'] = 'text';
    if (isNumeric) type = 'numeric';
    else if (isDate) type = 'datetime';
    else if (uniqueCount < 20) type = 'categorical';
    
    // Cardinality
    let cardinality: 'low' | 'medium' | 'high' = 'low';
    if (uniqueCount > 50) cardinality = 'high';
    else if (uniqueCount > 10) cardinality = 'medium';
    
    const profile: ColumnProfile = {
      name: header,
      type,
      missingCount,
      missingPercent: (missingCount / totalRows) * 100,
      uniqueCount,
      cardinality
    };
    
    // Stats for numeric columns
    if (type === 'numeric' && numericValues.length > 0) {
      const sorted = [...numericValues].sort((a, b) => a - b);
      const sum = numericValues.reduce((a, b) => a + b, 0);
      const mean = sum / numericValues.length;
      const variance = numericValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numericValues.length;
      
      profile.stats = {
        min: sorted[0],
        max: sorted[sorted.length - 1],
        mean,
        median: sorted[Math.floor(sorted.length / 2)],
        std: Math.sqrt(variance)
      };
    }
    
    // Top values for categorical
    if (type === 'categorical') {
      const valueCounts = new Map<any, number>();
      values.forEach(v => {
        valueCounts.set(v, (valueCounts.get(v) || 0) + 1);
      });
      
      profile.topValues = Array.from(valueCounts.entries())
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    }
    
    return profile;
  });
  
  return { columns, totalRows };
}
