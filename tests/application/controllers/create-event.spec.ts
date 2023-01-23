import CreateEventController from '@/application/controllers/create-event'
import CreateEvent from '@/domain/usecases/create-event'
import { Controller } from '@/application/controllers/controller'
import { createEventSchema } from '@/application/validation/schemas/create-event-schema'

import { MockProxy, mock } from 'jest-mock-extended'

describe('CreateEventController', () => {
  let sut: CreateEventController
  let createEvent: MockProxy<CreateEvent>
  let requestInput: any

  beforeAll(() => {
    createEvent = mock()
    createEvent.execute.mockResolvedValue({
      eventId: 'any_event_id',
      ticket: {
        id: 'any_ticket_id',
        batchs: [
          { id: 'any_batch_id' }
        ]
      }
    })
    requestInput = {
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
  })

  beforeEach(() => {
    sut = new CreateEventController(createEvent)
  })

  it('should extend Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call createEvent usecase with correct input', async () => {
    await sut.handle(requestInput, createEventSchema)

    expect(createEvent.execute).toBeCalledWith(requestInput)
    expect(createEvent.execute).toBeCalledTimes(1)
  })

  it('should return 201 with valid data', async () => {
    const httpResponse = await sut.handle(requestInput, createEventSchema)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        eventId: 'any_event_id',
        ticket: {
          id: 'any_ticket_id',
          batchs: [
            { id: 'any_batch_id' }
          ]
        }
      }
    })
  })
})
