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
      type: 'Company'
    })
    expect(eventRepository.create).toBeCalledTimes(1)
  })
})
