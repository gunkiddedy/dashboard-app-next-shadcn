import { ErrorMessages } from '@/lib/constants';
import { z } from 'zod';

export const updatePasswordSchema = z.object({
  password: z
    .string({
      required_error: ErrorMessages.required('Password'),
    })
    .min(8, { message: ErrorMessages.length(8, 'password') }),
  confirmPassword: z
    .string({
      required_error: ErrorMessages.required('Password'),
    })
    .min(8, { message: ErrorMessages.length(8, 'confirmation password') }),
});
