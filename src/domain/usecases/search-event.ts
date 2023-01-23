import EventRepository, { SearchEventRepo } from '@/domain/repositories/event-repository'

export default class SearchEvent {
  constructor (
    readonly eventRepository: EventRepository
  ) {}

  async execute (input: Input): Promise<SearchEventRepo.Output[]> {
    const event = this.eventRepository.search(input.searchParam)
    return event
  }
}

type Input = {
  searchParam: string
}
