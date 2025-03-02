import { ErrorMessages } from '@/lib/constants';
import { z } from 'zod';

export const employeeFilterSchema = z.object({
  searchValue: z.string().min(3, {
    message: ErrorMessages.required('Search must be at least 3 characters.'),
  }),
  departments: z.array(z.string()).min(1, {
    message: ErrorMessages.required("You have to select at least one item."),
  }),
  typeOfWork: z.string().min(1,{
    message: ErrorMessages.required("You have to select at least one item."),
  })
});