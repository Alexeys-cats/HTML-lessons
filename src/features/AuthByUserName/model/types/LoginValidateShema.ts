import { z } from 'zod';

export const loginValidateSchema = z.object({
  username: z
    .string()
    .min(3, 'Минимум 3 символов')
    .max(20, 'Максимум 20 символов')
    .refine((str) => str.trim() === str, 'Пробелы не допускаются')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Только латинские буквы и цифры или нижнее подчеркивание'
    ),
  password: z
    .string()
    .refine((str) => str.trim() === str, 'Пробелы не допускаются')
    .min(6, 'Минимум 6 символов'),
});

export type LoginForm = z.infer<typeof loginValidateSchema>;
