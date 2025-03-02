import { ErrorMessages } from '@/lib/constants';
import { z } from 'zod';

export const documentsSchema = z.object({
  resumeFile: z
    .custom<File>((file) => file instanceof File, {
      message: ErrorMessages.required('File'),
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: ErrorMessages.required('File size must be less than 5MB.'),
    })
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      {
        message: ErrorMessages.required('File must be a JPEG, PNG, or PDF.'),
      },
    ),
  appointmentLetterFile: z
    .custom<File>((file) => file instanceof File, {
      message: ErrorMessages.required('File'),
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: ErrorMessages.required('File size must be less than 5MB.'),
    })
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      {
        message: ErrorMessages.required('File must be a JPEG, PNG, or PDF.'),
      },
    ),
  salarySlipsFile: z
    .custom<File>((file) => file instanceof File, {
      message: ErrorMessages.required('File'),
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: ErrorMessages.required('File size must be less than 5MB.'),
    })
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      {
        message: ErrorMessages.required('File must be a JPEG, PNG, or PDF.'),
      },
    ),
  relievingLetterFile: z
    .custom<File>((file) => file instanceof File, {
      message: ErrorMessages.required('File'),
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: ErrorMessages.required('File size must be less than 5MB.'),
    })
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      {
        message: ErrorMessages.required('File must be a JPEG, PNG, or PDF.'),
      },
    ),
});
