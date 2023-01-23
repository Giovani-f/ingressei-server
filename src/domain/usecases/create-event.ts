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

  async execute (input: Input): Promise<Output> {
    input.currentDate = input.currentDate ?? new Date()
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
    const batchs = ticket.batchs.map(batch => {
      return {
        ticketId: ticketData.id,
        quantity: batch.quantity,
        price: batch.price,
        startDate: batch.startDate,
        endDate: batch.endDate
      }
    })
    const batchData = await this.batchRepository.createMany(batchs)

    return {
      eventId: eventData.id,
      ticket: {
        id: ticketData.id,
        batchs: batchData.map(batch => {
          return { id: batch.id }
        })
      }
    }
  }
}

type Input = {
  name: string
  address: Address
  date: string
  type: string
  ticket: {
    totalQuantity: number
    batchs: BatchData[]
  }
  currentDate?: Date
}

type Output = {
  eventId: string
  ticket: {
    id: string
    batchs: Array<{
      id: string
    }>
  }
}

type Address = {
  country: string
  city: string
  zipCode?: string
  street: string
  neighborhood: string
  localNumber: number
}

type BatchData = {
  quantity: number
  price: number
  startDate: string
  endDate: string
}
