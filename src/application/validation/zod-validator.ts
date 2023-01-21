import { Validator } from '@/application/validation/validator'
import { ZodSchema } from 'zod'

export class ZodValidator implements Validator {
  constructor (
    readonly schema: ZodSchema,
    readonly input: any
  ) {}

  validate (): Error | undefined {
    const result = this.schema.parse(this.input)
    if (result instanceof Error) {
      return new Error(result.message)
    }
    return undefined
  }
}
