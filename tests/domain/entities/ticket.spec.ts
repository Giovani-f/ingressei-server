import Ticket from '@/domain/entities/ticket'
import Batch from '@/domain/entities/batch'

describe('Ticket domain', () => {
  const totalQuantity = 1000

  it('should create a ticket', () => {
    const sut = new Ticket(totalQuantity)

    sut.addBatch(
      new Batch(300, 99.90, '2023-01-19T23:16:22.908Z', '2023-01-30T23:16:22.908Z'),
      new Date('2023-01-31T23:16:22.908Z')
    )

    expect(sut).toEqual({
      totalQuantity: 1000,
      batchs: [
        {
          quantity: 300,
          price: 99.90,
          startDate: '2023-01-19T23:16:22.908Z',
          endDate: '2023-01-30T23:16:22.908Z'
        }
      ]
    })
  })

  it('should throws when creating a batch with the end date greater than the event date', () => {
    const sut = new Ticket(totalQuantity)

    expect(() => sut.addBatch(
      new Batch(300, 99.90, '2023-01-19T23:16:22.908Z', '2023-01-28T23:16:22.908Z'),
      new Date('2023-01-27T23:16:22.908Z')
    )).toThrow(new Error('The batch end date must be less than the event date'))
  })

  it('should throws when creating a batch with the end date greater than the start date', () => {
    const sut = new Ticket(totalQuantity)

    expect(() => sut.addBatch(
      new Batch(300, 99.90, '2023-01-19T23:16:22.908Z', '2023-01-10T23:16:22.908Z'),
      new Date('2023-01-19T23:16:22.908Z')
    )).toThrow(new Error('Batch end date must be greater than start date'))
  })

  it('should throws when the total tickets of batches is greater than the total quantity of tickets', () => {
    const sut = new Ticket(totalQuantity)

    sut.addBatch(
      new Batch(1100, 99.90, '2023-01-19T23:16:22.908Z', '2023-01-30T22:16:22.908Z'),
      new Date('2023-01-31T23:16:22.908Z')
    )

    expect(() => sut.isValidNumberOfBatchTickets()).toThrow(new Error('The number of batch tickets is greater than the total number of tickets'))
  })
})
