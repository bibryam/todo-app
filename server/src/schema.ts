
import { z } from 'zod';

// Priority enum
export const prioritySchema = z.enum(['Low', 'Medium', 'High']);
export type Priority = z.infer<typeof prioritySchema>;

// Task schema
export const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  due_date: z.coerce.date().nullable(),
  priority: prioritySchema,
  completed: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Task = z.infer<typeof taskSchema>;

// Input schema for creating tasks
export const createTaskInputSchema = z.object({
  name: z.string().min(1, 'Task name is required'),
  description: z.string().nullable().optional(),
  due_date: z.coerce.date().nullable().optional(),
  priority: prioritySchema.default('Medium')
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;

// Input schema for updating tasks
export const updateTaskInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Task name is required').optional(),
  description: z.string().nullable().optional(),
  due_date: z.coerce.date().nullable().optional(),
  priority: prioritySchema.optional(),
  completed: z.boolean().optional()
});

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;

// Input schema for deleting tasks
export const deleteTaskInputSchema = z.object({
  id: z.number()
});

export type DeleteTaskInput = z.infer<typeof deleteTaskInputSchema>;

// Input schema for toggling task completion
export const toggleTaskCompletionInputSchema = z.object({
  id: z.number(),
  completed: z.boolean()
});

export type ToggleTaskCompletionInput = z.infer<typeof toggleTaskCompletionInputSchema>;
