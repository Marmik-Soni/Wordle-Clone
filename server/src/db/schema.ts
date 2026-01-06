import { pgTable, serial, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

// Words table - stores all valid 5-letter words
export const words = pgTable('words', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 5 }).notNull().unique(),
  frequency: integer('frequency').default(0), // How often this word is used
  createdAt: timestamp('created_at').defaultNow(),
});

// Games table - stores game sessions
export const games = pgTable('games', {
  id: serial('id').primaryKey(),
  wordId: integer('word_id').references(() => words.id),
  attempts: integer('attempts').notNull(), // Number of guesses made
  won: boolean('won').notNull().default(false),
  guesses: varchar('guesses', { length: 500 }), // JSON string of guesses
  completedAt: timestamp('completed_at').defaultNow(),
});

// Daily word table - stores the daily challenge word
export const dailyWords = pgTable('daily_words', {
  id: serial('id').primaryKey(),
  date: varchar('date', { length: 10 }).notNull().unique(), // YYYY-MM-DD
  wordId: integer('word_id').references(() => words.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Type exports for TypeScript
export type Word = typeof words.$inferSelect;
export type NewWord = typeof words.$inferInsert;

export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;

export type DailyWord = typeof dailyWords.$inferSelect;
export type NewDailyWord = typeof dailyWords.$inferInsert;
