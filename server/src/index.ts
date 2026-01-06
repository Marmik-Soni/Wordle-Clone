import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { db } from './db/index.js';
import { words } from './db/schema.js';
import { eq } from 'drizzle-orm';

const app = new Hono();

// Enable CORS for the frontend
app.use(
  '/*',
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all words (for testing)
app.get('/api/words', async (c) => {
  try {
    const allWords = await db.select().from(words).limit(10);
    return c.json({ words: allWords });
  } catch (error) {
    return c.json({ error: 'Failed to fetch words' }, 500);
  }
});

// Add a word (for testing)
app.post('/api/words', async (c) => {
  try {
    const { word } = await c.req.json();
    const newWord = await db.insert(words).values({ word }).returning();
    return c.json({ word: newWord[0] });
  } catch (error) {
    return c.json({ error: 'Failed to add word' }, 500);
  }
});

// Root endpoint
app.get('/', (c) => {
  return c.json({
    name: 'Wordle Clone API',
    version: '1.0.0',
    database: 'Connected to Neon PostgreSQL',
    endpoints: {
      health: '/health',
      api: '/api/*',
    },
  });
});

const port = parseInt(process.env.PORT || '3000');

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`🚀 Server is running on http://localhost:${info.port}`);
    console.log(`📊 Database connected to Neon PostgreSQL`);
  }
);
