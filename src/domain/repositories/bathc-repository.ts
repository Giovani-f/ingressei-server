export default interface BatchRepository {
  createMany: (input: CreateBatch.Input[]) => Promise<CreateBatch.Output[]>
}

export namespace CreateBatch {
  export type Input = {
    ticketId: string
    quantity: number
    price: number
    startDate: string
    endDate: string
  }

  export type Output = {
    id: string
  }
}
