import Batch from '@/domain/entities/batch'

export default class Ticket {
  ticketBatchs: Batch[]
  constructor (
    readonly totalAmount: number
  ) {
    this.ticketBatchs = []
  }

  addBatch (batch: Batch, eventDate: Date): void {
    batch.isValidEndDate(eventDate)
    this.ticketBatchs.push(new Batch(batch.amount, batch.price, batch.startDate, batch.endDate))
  }

  isValidNumberOfBatchTickets (): void {
    const batchTicketsQuantity = this.ticketBatchs
      .map(batch => batch.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    if (batchTicketsQuantity > this.totalAmount) throw new Error('The number of batch tickets is greater than the total number of tickets')
  }
}
