import SearchEventController from '@/application/controllers/search-event'
import SearchEvent from '@/domain/usecases/search-event'
import { Controller } from '@/application/controllers/controller'
import { searchEventSchema } from '@/application/validation/schemas/search-event-schema'

import { MockProxy, mock } from 'jest-mock-extended'

describe('CreateEventController', () => {
  let sut: SearchEventController
  let searchEvent: MockProxy<SearchEvent>

  beforeAll(() => {
    searchEvent = mock()
    searchEvent.execute.mockResolvedValue([
      {
        id: 'any_id',
        name: 'specific name of event',
        address: {
          city: 'any_address',
          street: 'any_address',
          country: 'any_address',
          zipCode: 'any_address',
          localNumber: 100,
          neighborhood: 'any_address'
        },
        date: 'any_date',
        type: 'University',
        ticket: {
          id: 'any_id',
          totalQuantity: 500,
          reamingQuantity: 500,
          batchs: [
            {
              id: 'any_id',
              quantity: 300,
              price: 99.9,
              startDate: 'any_date',
              endDate: 'any_date'
            }
          ]
        }
      }
    ])
  })

  const requestInput = { searchParam: 'any_searchparam' }

  beforeEach(() => {
    sut = new SearchEventController(searchEvent)
  })

  it('should extend Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call searchEvent usecase with correct input', async () => {
    await sut.handle(requestInput, searchEventSchema)

    expect(searchEvent.execute).toBeCalledWith(requestInput)
    expect(searchEvent.execute).toBeCalledTimes(1)
  })

  it('should return 201 with valid data', async () => {
    const httpResponse = await sut.handle(requestInput, searchEventSchema)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [
        {
          id: 'any_id',
          name: 'specific name of event',
          address: {
            city: 'any_address',
            street: 'any_address',
            country: 'any_address',
            zipCode: 'any_address',
            localNumber: 100,
            neighborhood: 'any_address'
          },
          date: 'any_date',
          type: 'University',
          ticket: {
            id: 'any_id',
            totalQuantity: 500,
            reamingQuantity: 500,
            batchs: [
              {
                id: 'any_id',
                quantity: 300,
                price: 99.9,
                startDate: 'any_date',
                endDate: 'any_date'
              }
            ]
          }
        }
      ]
    })
  })
})
