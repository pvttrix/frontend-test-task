import { z } from 'zod';

export const shippingFormSchema = z.object({
  city: z.string().trim().min(1, 'City is required').max(100, 'City name is too long'),
  state: z.string().trim().min(1, 'State is required').max(100, 'State name is too long'),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, 'Zip code must be 5 digits'),
});

export type ShippingFormData = z.infer<typeof shippingFormSchema>;
