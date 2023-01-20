import Event from '@/domain/entities/event'
import Ticket from '@/domain/entities/ticket'

describe('Event Domain', () => {
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
    type: 'Company'
  }

  const currentDate = new Date('2023-01-10T23:16:22.908Z')

  it('should create a event', () => {
    const ticket = new Ticket(1000)
    const sut = new Event(eventData, ticket, currentDate)

    expect(sut).toEqual({
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
        totalAmount: 1000,
        batchs: []
      }
    })
  })

  it('should return an error when creating an event with the previous date today', () => {
    const currentDate = new Date('2023-01-28T23:16:22.908Z')
    eventData.date = '2023-01-19T23:16:22.908Z'
    const ticket = new Ticket(1000)

    expect(() => new Event(eventData, ticket, currentDate)).toThrow(new Error('Invalid date'))
  })

  it('should return an error when creating an event with invalid type', () => {
    eventData.type = 'any_type'
    const ticket = new Ticket(1000)

    expect(() => new Event(eventData, ticket, currentDate)).toThrow(new Error('The event type must be Company or University'))
  })
})
