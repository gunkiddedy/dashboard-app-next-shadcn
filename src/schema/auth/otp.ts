import { ErrorMessages } from '@/lib/constants';

import { z } from 'zod';

export const otpSchema = z.object({
  pin: z
    .string({
      required_error: ErrorMessages.required('OTP'),
    })
    .min(5, { message: ErrorMessages.length(5, 'one-time password') }),
});
