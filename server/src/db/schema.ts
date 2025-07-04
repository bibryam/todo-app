
import { serial, text, pgTable, timestamp, boolean, pgEnum, date } from 'drizzle-orm/pg-core';

// Priority enum for database
export const priorityEnum = pgEnum('priority', ['Low', 'Medium', 'High']);

export const tasksTable = pgTable('tasks', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'), // Nullable by default
  due_date: date('due_date'), // Nullable by default
  priority: priorityEnum('priority').notNull().default('Medium'),
  completed: boolean('completed').notNull().default(false),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// TypeScript types for the table schema
export type Task = typeof tasksTable.$inferSelect; // For SELECT operations
export type NewTask = typeof tasksTable.$inferInsert; // For INSERT operations

// Export all tables for proper query building
export const tables = { tasks: tasksTable };
