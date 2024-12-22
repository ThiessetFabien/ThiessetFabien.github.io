import { z } from 'zod';

export const createStringSchema = (
  min: number,
  max: number,
  fieldName: string
) =>
  z
    .string()
    .min(min, {
      message: `This ${fieldName} must contain at least ${min} characters`,
    })
    .max(max, {
      message: `This ${fieldName} must contain at most ${max} characters`,
    });

export const formSchema = z.object({
  name: createStringSchema(2, 50, 'name'),
  type: z.enum(['offer', 'collaboration', 'question', 'other'], {
    required_error: 'You need to select a notification type.',
  }),
  mail: z.string().email(),
  message: createStringSchema(10, 500, 'message'),
});
