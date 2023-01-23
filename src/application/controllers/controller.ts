import { badRequest, HttpResponse, serverError } from '@/application/helpers/http'
import { ZodSchema } from 'zod'
import { ZodValidator } from '@/infra/gateways/zod-validator'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  async handle (httpRequest: any, schema: ZodSchema): Promise<HttpResponse> {
    const error = this.validate(httpRequest, schema)
    if (error !== undefined) return badRequest(error)
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  private validate (httpRquest: any, schema: ZodSchema): Error | undefined {
    const validator = new ZodValidator(schema, httpRquest)
    return validator.validate()
  }
}
