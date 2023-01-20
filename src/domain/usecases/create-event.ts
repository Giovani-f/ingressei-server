import Event from '@/domain/entities/event'
import EventRepository from '@/domain/repositories/event-repository'

export default class CreateEvent {
  constructor (readonly eventRepository: EventRepository) {}

  async execute (input: Input): Promise<void> {
    const event = new Event(input, input.currentDate)

    await this.eventRepository.create(event)
  }
}

type Input = {
  name: string
  address: Address
  date: string
  type: string
  currentDate: Date
}

type Address = {
  country: string
  city: string
  zipCode?: string
  street: string
  neighborhood: string
  localNumber: number
}
