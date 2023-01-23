import CreateEvent from '@/domain/usecases/create-event'
import BatchRepositoryPG from '@/infra/repositories/pg/batch-repository-pg'
import EventRepositoryPG from '@/infra/repositories/pg/event-repository-pg'
import TicketRepositoryPG from '@/infra/repositories/pg/ticket-repository-pg'

export const makeCreateEventUseCase = (): CreateEvent => {
  return new CreateEvent(
    new EventRepositoryPG(),
    new TicketRepositoryPG(),
    new BatchRepositoryPG()
  )
}
