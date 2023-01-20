export default class Batch {
  constructor (
    readonly quantity: number,
    readonly price: number,
    readonly startDate: string,
    readonly endDate: string
  ) {
    this.isValidDate()
  }

  isValidEndDate (date: Date): void {
    if (new Date(this.endDate) > date) throw new Error('The batch end date must be less than the event date')
  }

  isValidDate (): void {
    if (new Date(this.endDate) < new Date(this.startDate)) throw new Error('Batch end date must be greater than start date')
  }
}
