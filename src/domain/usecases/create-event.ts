import Event from '@/domain/entities/event'
import EventRepository from '@/domain/repositories/event-repository'
import Batch from '@/domain/entities/batch'

export default class CreateEvent {
  constructor (readonly eventRepository: EventRepository) {}

  async execute (input: Input): Promise<void> {
    const event = new Event(input, input.ticket, input.currentDate)
    if (input.ticket.batchs.length === 0) throw new Error('The ticket must contain at least 1 batch')
    for (const ticketBatch of input.ticket.batchs) {
      const batch = new Batch(ticketBatch.amount, ticketBatch.price, ticketBatch.startDate, ticketBatch.endDate)
      event.ticket.addBatch(batch, new Date(input.date))
    }

    await this.eventRepository.create(event)
  }
}

type Input = {
  name: string
  address: Address
  date: string
  type: string
  ticket: TicketData
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

type TicketData = {
  totalAmount: number
  batchs: BatchData[]
}

type BatchData = {
  amount: number
  price: number
  startDate: string
  endDate: string
}
