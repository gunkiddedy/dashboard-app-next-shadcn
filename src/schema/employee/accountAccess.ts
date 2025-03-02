import { ErrorMessages } from '@/lib/constants';
import { z } from 'zod';

export const accountAccessSchema = z.object({
  slackId: z
    .string({
      required_error: ErrorMessages.required('Slack Id'),
    })
    .min(3, {
      message: ErrorMessages.required(
        'Slack Id must be at least 3 characters long.',
      ),
    }),
  githubId: z
    .string({
      required_error: ErrorMessages.required('Github Id'),
    })
    .min(3, {
      message: ErrorMessages.required(
        'Github Id must be at least 3 characters long.',
      ),
    }),
  skypeId: z
    .string({
      required_error: ErrorMessages.required('Skype Id'),
    })
    .min(3, {
      message: ErrorMessages.required(
        'Skype Id must be at least 3 characters long.',
      ),
    }),
  trelloId: z
    .string({
      required_error: ErrorMessages.required('Trello Id'),
    })
    .min(3, {
      message: ErrorMessages.required(
        'Trello Id must be at least 3 characters long.',
      ),
    }),
});
