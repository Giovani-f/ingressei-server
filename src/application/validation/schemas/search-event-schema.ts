import { z } from 'zod'

export const searchEventSchema = z.object({
  searchParam: z.string()
})

export type SearchEventRequest = z.infer<typeof searchEventSchema>
