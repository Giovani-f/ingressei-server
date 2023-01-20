import EventRepository from '@/domain/repositories/event-repository'
import CreateEvent from '@/domain/usecases/create-event'

import { mock, MockProxy } from 'jest-mock-extended'

// jest.mock('@/domain/entities/event')

describe('Create Event', () => {
  let eventRepository: MockProxy<EventRepository>
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
      totalAmount: 500,
      batchs: [
        {
          amount: 500,
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
    eventRepository.create.mockResolvedValue({ id: 'any_id' })
  })

  beforeEach(() => {
    sut = new CreateEvent(eventRepository)
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
      ticket: {
        batchs: [
          {
            amount: 500,
            endDate: '2023-01-11T23:16:22.908Z',
            price: 89.9,
            startDate: '2023-01-101T23:16:22.908Z'
          }
        ],
        totalAmount: 500
      },
      type: 'Company'
    })
    expect(eventRepository.create).toBeCalledTimes(1)
  })

  it('should create event without ticket batch', async () => {
    eventData.ticket.batchs = []
    const promise = sut.execute(eventData)

    await expect(promise).rejects.toThrow('The ticket must contain at least 1 batch')
  })
})
