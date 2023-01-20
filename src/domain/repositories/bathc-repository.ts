export default interface BatchRepository {
  create: (input: CreateBatch.Input) => Promise<void>
}

export namespace CreateBatch {
  export type Input = {
    ticketId: string
    quantity: number
    price: number
    startDate: string
    endDate: string
  }
}
