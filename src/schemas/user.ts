import { z } from 'zod'
export const createUserSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(3, 'First name must be at least 3 characters long'),
  last_name: z
    .string()
    .trim()
    .min(3, 'Last name must be at least 3 characters long'),
  email: z.email().trim(),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be at most 20 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    ),
})
