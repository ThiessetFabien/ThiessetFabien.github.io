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

export const ContactFormSchema = z.object({
  name: createStringSchema(2, 50, 'name').nonempty('Name is required'),
  type: z.enum(['Offer', 'Inquiry', 'Other'], {
    required_error: 'You need to select a notification type.',
  }),
  email: z.string().email('Invalid email address'),
  phone: createStringSchema(10, 15, 'phone').nonempty('Phone is required'),
  message: createStringSchema(10, 500, 'message').nonempty(
    'Message is required'
  ),
  consent: z.boolean().refine((value) => value === true, {
    message: 'You need to accept the privacy policy',
  }),
});

export type FormSchema = z.infer<typeof ContactFormSchema>;
