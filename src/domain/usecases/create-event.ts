import Event from '@/domain/entities/event'
import EventRepository from '@/domain/repositories/event-repository'
import Batch from '@/domain/entities/batch'
import Ticket from '@/domain/entities/ticket'
import TicketRepository from '@/domain/repositories/ticket-repository'
import BatchRepository from '@/domain/repositories/bathc-repository'

export default class CreateEvent {
  constructor (
    readonly eventRepository: EventRepository,
    readonly ticketRepository: TicketRepository,
    readonly batchRepository: BatchRepository
  ) {}

  async execute (input: Input): Promise<void> {
    const event = new Event(input, input.currentDate)
    const ticket = new Ticket(input.ticket.totalQuantity)
    if (input.ticket.batchs.length === 0) throw new Error('The ticket must contain at least 1 batch')
    for (const ticketBatch of input.ticket.batchs) {
      const batch = new Batch(ticketBatch.quantity, ticketBatch.price, ticketBatch.startDate, ticketBatch.endDate)
      ticket.addBatch(batch, new Date(input.date))
    }

    const eventData = await this.eventRepository.create(event)
    const ticketData = await this.ticketRepository.create({
      eventId: eventData.id,
      totalQuantity: ticket.totalQuantity,
      reamingQuantity: ticket.totalQuantity
    })
    if (ticketData?.id) {
      const batchs = ticket.batchs.map(batch => {
        return {
          ticketId: ticketData.id,
          quantity: batch.quantity,
          price: batch.price,
          startDate: batch.startDate,
          endDate: batch.endDate
        }
      })
      await this.batchRepository.createMany(batchs)
    }
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
  totalQuantity: number
  batchs: BatchData[]
}

type BatchData = {
  quantity: number
  price: number
  startDate: string
  endDate: string
}
