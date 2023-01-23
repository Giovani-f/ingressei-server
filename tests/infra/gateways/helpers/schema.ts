import { z } from 'zod'

export const schemaExample = z.object({
  name: z.string(),
  address: z.object({
    country: z.string(),
    city: z.string(),
    zipCode: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    localNumber: z.number()
  }),
  date: z.string(),
  type: z.enum(['Company', 'University']),
  ticket: z.object({
    totalQuantity: z.number(),
    batchs: z.object({
      quantity: z.number(),
      price: z.number(),
      startDate: z.string(),
      endDate: z.string()
    }).array().nonempty()
  })
})
