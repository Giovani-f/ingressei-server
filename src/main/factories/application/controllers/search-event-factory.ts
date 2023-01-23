import { Controller } from '@/application/controllers/controller'
import SearchEventController from '@/application/controllers/search-event'
import { makeSearchEventUseCase } from '@/main/factories/domain/usecases/search-event-usecase-factory'

export const makeSearchEventController = (): Controller => {
  return new SearchEventController(
    makeSearchEventUseCase()
  )
}
