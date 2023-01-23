import { Validator } from '@/application/validation/validator'
import { ZodSchema } from 'zod'

export class ZodValidator implements Validator {
  constructor (
    readonly schema: ZodSchema,
    readonly input: any
  ) {}

  validate (): Error | undefined {
    const result = this.schema.safeParse(this.input)
    if (!result.success) {
      return new Error(result.error.message)
    }
    return undefined
  }
}
