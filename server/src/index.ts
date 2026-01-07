import 'dotenv/config';
import { serve } from '@hono/node-server';
import app from './app.js';

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
