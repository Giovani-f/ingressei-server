import SearchEvent from '@/domain/usecases/search-event'
import EventRepositoryPG from '@/infra/repositories/pg/event-repository-pg'

export const makeSearchEventUseCase = (): SearchEvent => {
  return new SearchEvent(
    new EventRepositoryPG()
  )
}
