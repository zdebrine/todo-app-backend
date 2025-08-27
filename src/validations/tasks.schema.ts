import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'title is required'),
  color: z.string().optional().nullable(),
  completed: z.boolean().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  color: z.string().optional().nullable(),
  completed: z.boolean().optional(),
});
