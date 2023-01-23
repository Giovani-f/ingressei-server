import { Controller } from '@/application/controllers/controller'
import CreateEventController from '@/application/controllers/create-event'
import { makeCreateEventUseCase } from '@/main/factories/domain/usecases/create-event-usecase-factory'

export const makeCreateEventController = (): Controller => {
  return new CreateEventController(
    makeCreateEventUseCase()
  )
}
