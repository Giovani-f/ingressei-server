import Ticket from '@/domain/entities/ticket'

type Address = {
  country: string
  city: string
  zipCode?: string
  street: string
  neighborhood: string
  localNumber: number
}

type EventData = {
  id?: string
  name: string
  date: string
  address: Address
  type: string
}

type TicketData = {
  totalAmount: number
}

export default class Event {
  name: string
  address: Address
  date: string
  type: string
  ticket: Ticket

  constructor (eventData: EventData, ticketData: TicketData, currentDate: Date) {
    this.name = eventData.name
    this.address = eventData.address
    this.date = eventData.date
    this.type = eventData.type
    this.ticket = new Ticket(ticketData.totalAmount)
    this.isValidDate(this.date, currentDate)
    this.isValidEventType()
  }

  isValidDate (date: string, currentDate: Date): void {
    if (new Date(date) <= currentDate) throw new Error('Invalid date')
  }

  isValidEventType (): void {
    const eventTypes = ['Company', 'University']
    if (!eventTypes.includes(this.type)) throw new Error('The event type must be Company or University')
  }
}
