import { ErrorMessages } from '@/lib/constants';
import { z } from 'zod';

export const professionalInformationSchema = z.object({
  employeeId: z.string({
    required_error: ErrorMessages.required('Employee Id'),
  }),
  userName: z.string({
    required_error: ErrorMessages.required('User Name'),
  }).min(3, {
    message: ErrorMessages.required('User name must be at least 3 characters long.'),
  }),
  employeeType: z.string({
    required_error: ErrorMessages.required('Employee Type'),
  }),
  role: z.string({
    required_error: ErrorMessages.required('Role'),
  }),
  department: z.string({
    required_error: ErrorMessages.required('Department'),
  }),
  workingHours: z.string({
    required_error: ErrorMessages.required('Working Hours'),
  }),
  officeLocation: z.string({
    required_error: ErrorMessages.required('Office Location'),
  }),
  joiningDate: z.date({
    required_error: ErrorMessages.required('Joining Date'),
  }),
});
