import { Router } from 'express';
import Papa from 'papaparse';
import { profileData } from '../services/profiler';
import { generateChartSuggestions } from '../services/charts';
import { generateInsights } from '../services/insights';

export const analyzeRouter = Router();

analyzeRouter.post('/', async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const csvText = req.file.buffer.toString('utf-8');
    
    // Parse CSV
    const parseResult = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    });

    if (parseResult.errors.length > 0) {
      return res.status(400).json({ 
        error: 'CSV parsing error', 
        details: parseResult.errors 
      });
    }

    const data = parseResult.data;
    const headers = parseResult.meta.fields || [];

    if (data.length === 0) {
      return res.status(400).json({ error: 'CSV file is empty' });
    }

    // Profile the data
    const profile = profileData(data, headers);

    // Generate chart suggestions
    const charts = generateChartSuggestions(data, profile);

    // Generate AI insights
    const insights = await generateInsights(data, profile);

    res.json({
      profile,
      charts,
      insights,
      preview: data.slice(0, 10),
      rowCount: data.length,
      columnCount: headers.length
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze CSV', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});
