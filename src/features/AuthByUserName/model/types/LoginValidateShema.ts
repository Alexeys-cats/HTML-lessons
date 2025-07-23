import { z } from 'zod';

export const loginValidateSchema = z.object({
  username: z.string().min(3, 'Минимум 3 символов'),
  password: z.string().min(6, 'Минимум 6 символов'),
});

export type LoginForm = z.infer<typeof loginValidateSchema>;
