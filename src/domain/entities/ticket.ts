import Batch from '@/domain/entities/batch'

export default class Ticket {
  batchs: Batch[]
  constructor (
    readonly totalQuantity: number
  ) {
    this.batchs = []
  }

  addBatch (batch: Batch, eventDate: Date): void {
    batch.isValidEndDate(eventDate)
    this.batchs.push(new Batch(batch.quantity, batch.price, batch.startDate, batch.endDate))
  }

  isValidNumberOfBatchTickets (): void {
    const batchTicketsQuantity = this.batchs
      .map(batch => batch.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    if (batchTicketsQuantity > this.totalQuantity) throw new Error('The number of batch tickets is greater than the total number of tickets')
  }
}
