import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

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

// API routes
app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello from Wordle Clone API!' });
});

// Root endpoint
app.get('/', (c) => {
  return c.json({
    name: 'Wordle Clone API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/*',
    },
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`🚀 Server is running on http://localhost:${info.port}`);
  }
);
