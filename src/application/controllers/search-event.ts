import { Controller } from '@/application/controllers/controller'
import { ok, HttpResponse } from '@/application/helpers/http'
import SearchEvent from '@/domain/usecases/search-event'
import { SearchEventRequest } from '../validation/schemas/search-event-schema'

export default class SearchEventController extends Controller {
  constructor (private readonly searchEvent: SearchEvent) {
    super()
  }

  override async perform (httpRequest: SearchEventRequest): Promise<HttpResponse<any>> {
    const response = await this.searchEvent.execute(httpRequest)
    return ok(response)
  }
}
