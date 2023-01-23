import EventRepository from '@/domain/repositories/event-repository'
import SearchEvent from '@/domain/usecases/search-event'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Search Event', () => {
  let eventRepository: MockProxy<EventRepository>
  let sut: SearchEvent

  beforeAll(() => {
    eventRepository = mock()
    eventRepository.search.mockResolvedValue([{
      id: 'any_event_id',
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
        id: 'any_ticket_id',
        totalQuantity: 500,
        reamingQuantity: 500,
        batchs: [
          {
            id: 'any_batch_id',
            quantity: 300,
            price: 89.90,
            startDate: '2023-01-101T23:16:22.908Z',
            endDate: '2023-01-11T23:16:22.908Z'
          }
        ]
      }
    }])
  })

  beforeEach(() => {
    sut = new SearchEvent(eventRepository)
  })

  it('should search event with correct input', async () => {
    await sut.execute({ searchParam: 'any_search_param' })

    expect(eventRepository.search).toHaveBeenCalledWith('any_search_param')
    expect(eventRepository.search).toBeCalledTimes(1)
  })

  it('should search the event with the correct input and return the correct event(s)', async () => {
    const result = await sut.execute({ searchParam: 'any_search_param' })

    expect(result).toEqual([{
      id: 'any_event_id',
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
        id: 'any_ticket_id',
        totalQuantity: 500,
        reamingQuantity: 500,
        batchs: [
          {
            id: 'any_batch_id',
            quantity: 300,
            price: 89.90,
            startDate: '2023-01-101T23:16:22.908Z',
            endDate: '2023-01-11T23:16:22.908Z'
          }
        ]
      }
    }])
  })
})
