import EventRepository from '@/domain/repositories/event-repository'
import TicketRepository from '@/domain/repositories/ticket-repository'
import BatchRepository from '@/domain/repositories/bathc-repository'
import CreateEvent from '@/domain/usecases/create-event'

import { mock, MockProxy } from 'jest-mock-extended'

// jest.mock('@/domain/entities/event')

describe('Create Event', () => {
  let eventRepository: MockProxy<EventRepository>
  let ticketRepository: MockProxy<TicketRepository>
  let batchRepository: MockProxy<BatchRepository>
  let sut: CreateEvent
  const eventData = {
    name: 'any_name',
    address: {
      country: 'any_country',
      city: 'any_city',
      zipCode: 'any_zipcode',
      street: 'any_street',
      neighborhood: 'any_neighborhood',
      localNumber: 500
    },
    date: '2023-01-19T23:16:22.908Z',
    type: 'Company',
    ticket: {
      totalQuantity: 500,
      batchs: [
        {
          quantity: 300,
          price: 89.90,
          startDate: '2023-01-101T23:16:22.908Z',
          endDate: '2023-01-11T23:16:22.908Z'
        }
      ]
    },
    currentDate: new Date('2023-01-10T23:16:22.908Z')
  }

  beforeAll(() => {
    eventRepository = mock()
    eventRepository.create.mockResolvedValue({ id: 'any_event_id' })
    ticketRepository = mock()
    ticketRepository.create.mockResolvedValue({ id: 'any_ticket_id' })
    batchRepository = mock()
  })

  beforeEach(() => {
    sut = new CreateEvent(eventRepository, ticketRepository, batchRepository)
  })

  it('should create event with correct input', async () => {
    await sut.execute(eventData)

    expect(eventRepository.create).toHaveBeenCalledWith({
      name: 'any_name',
      address: {
        country: 'any_country',
        city: 'any_city',
        zipCode: 'any_zipcode',
        street: 'any_street',
        neighborhood: 'any_neighborhood',
        localNumber: 500
      },
      date: '2023-01-19T23:16:22.908Z',
      type: 'Company'
    })

    expect(eventRepository.create).toBeCalledTimes(1)
  })

  it('should create event ticket with correct input', async () => {
    await sut.execute(eventData)

    expect(ticketRepository.create).toHaveBeenCalledWith({
      eventId: 'any_event_id',
      totalQuantity: 500,
      reamingQuantity: 500
    })

    expect(ticketRepository.create).toBeCalledTimes(1)
  })

  it('should create ticket batch with correct input', async () => {
    await sut.execute(eventData)

    expect(batchRepository.create).toHaveBeenCalledWith({
      ticketId: 'any_ticket_id',
      quantity: 300,
      price: 89.90,
      startDate: '2023-01-101T23:16:22.908Z',
      endDate: '2023-01-11T23:16:22.908Z'
    })

    expect(batchRepository.create).toBeCalledTimes(1)
  })

  it('should create ticket batch with correct input', async () => {
    eventData.ticket.batchs.push({
      quantity: 100,
      price: 99.90,
      startDate: '2023-01-121T23:16:22.908Z',
      endDate: '2023-01-17T23:16:22.908Z'
    })
    await sut.execute(eventData)

    expect(batchRepository.create).toBeCalledTimes(2)
  })

  it('should create event without ticket batch', async () => {
    eventData.ticket.batchs = []
    const promise = sut.execute(eventData)

    await expect(promise).rejects.toThrow('The ticket must contain at least 1 batch')
  })
})
