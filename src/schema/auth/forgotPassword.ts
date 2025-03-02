import { ErrorMessages } from '@/lib/constants';
import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: ErrorMessages.required('Email'),
    })
    .email({ message: ErrorMessages.invalidEmail }),
});
