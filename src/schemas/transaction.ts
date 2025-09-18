import { z } from 'zod'
import { isValidCurrency } from '../controllers/helpers/validator.ts'

// Transaction types enum for validation
const TransactionType = z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'])

export const createTransactionSchema = z.object({
  user_id: z.uuid().trim(),
  name: z
    .string()
    .trim()
    .min(1, 'Transaction name is required')
    .max(100, 'Transaction name must be at most 100 characters long'),
  date: z.coerce.date(),
  amount: z
    .number()
    .positive('Amount must be positive')
    .min(1, 'Amount is required')
    .multipleOf(0.01, 'Amount must have at most 2 decimal places')
    .refine((value) => isValidCurrency(value), 'Invalid currency'),
  type: z
    .string()
    .trim()
    .transform((val) => val.toUpperCase())
    .pipe(TransactionType),
})

// Export the transaction type enum for use in other files
export type TransactionTypeEnum = z.infer<typeof TransactionType>

// Schema for updating a transaction; all fields optional except user_id
export const updateTransactionSchema = createTransactionSchema
  .omit({ user_id: true })
  .partial()
  .strict()
