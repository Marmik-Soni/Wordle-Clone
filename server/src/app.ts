import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { db } from './db/index.js';
import { words } from './db/schema.js';

const app = new Hono();

const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// Enable CORS for frontend
app.use(
  '/*',
  cors({
    origin: allowedOrigin,
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
  } catch (_error) {
    return c.json({ error: 'Failed to fetch words' }, 500);
  }
});

// Add a word (for testing)
app.post('/api/words', async (c) => {
  try {
    const { word } = await c.req.json();
    const newWord = await db.insert(words).values({ word }).returning();
    return c.json({ word: newWord[0] });
  } catch (_error) {
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

export default app;
export { app };
