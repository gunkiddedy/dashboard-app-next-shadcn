import { ErrorMessages } from '@/lib/constants';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: ErrorMessages.required('Email'),
    })
    .email({ message: ErrorMessages.invalidEmail }),
  password: z
    .string({
      required_error: ErrorMessages.required('Password'),
    })
    .min(1, {
      message: ErrorMessages.required('Password'),
    }),
});
