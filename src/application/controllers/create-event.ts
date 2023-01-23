import { Controller } from '@/application/controllers/controller'
import CreateEvent from '@/domain/usecases/create-event'
import { created, HttpResponse } from '@/application/helpers/http'
import { CreateEventRequest } from '@/application/validation/schemas/create-event-schema'

export default class CreateEventController extends Controller {
  constructor (private readonly createEvent: CreateEvent) {
    super()
  }

  override async perform (httpRequest: CreateEventRequest): Promise<HttpResponse<any>> {
    const response = await this.createEvent.execute(httpRequest)
    return created(response)
  }
}
