import { Router } from 'express';
import { processQuery } from '../services/chat';

export const chatRouter = Router();

chatRouter.post('/', async (req, res) => {
  try {
    const { query, data, profile } = req.body;

    if (!query || !data) {
      return res.status(400).json({ error: 'Query and data are required' });
    }

    const response = await processQuery(query, data, profile);

    res.json(response);

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process query',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});
