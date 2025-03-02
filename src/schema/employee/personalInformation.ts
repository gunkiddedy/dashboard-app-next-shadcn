import { ErrorMessages } from '@/lib/constants';
import { z } from 'zod';

export const personalInformationSchema = z.object({
  firstName: z.string({
    required_error: ErrorMessages.required('First Name'),
  }).min(3, {
    message: ErrorMessages.required('Name must be at least 3 characters long.'),
  }),
  lastName: z.string({
    required_error: ErrorMessages.required('Last Name'),
  }).min(3, {
    message: ErrorMessages.required('Name must be at least 3 characters long.'),
  }),
  email: z
    .string({
      required_error: ErrorMessages.required('Email'),
    })
    .email({ message: ErrorMessages.invalidEmail }),
  phoneNumber: z.string({
    required_error: ErrorMessages.required('Phone Number'),
  }).min(10, {
    message: ErrorMessages.required('Phone must be at least 10 characters long.'),
  }),
  addressCountry: z.string({
    required_error: ErrorMessages.required('Address Country'),
  }),
  addressCity: z.string({
    required_error: ErrorMessages.required('Address City'),
  }).min(3, {
    message: ErrorMessages.required('City must be at least 3 characters long.'),
  }),
  addressStreet: z.string({
    required_error: ErrorMessages.required('Address Street'),
  }).min(3, {
    message: ErrorMessages.required('Street must be at least 3 characters long.'),
  }),
  postalCode: z.string({
    required_error: ErrorMessages.required('Postal Code'),
  }).min(3, {
    message: ErrorMessages.required('Postal Code must be at least 3 characters long.'),
  }),
  dateOfBirth: z.date({
    required_error: ErrorMessages.required('Date Of Birth'),
  }),
  gender: z.string({
    required_error: ErrorMessages.required('Gender'),
  }),
});
