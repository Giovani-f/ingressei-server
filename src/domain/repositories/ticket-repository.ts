export default interface TicketRepository {
  create: (input: CreateTicket.Input) => Promise<CreateTicket.Output>
}

export namespace CreateTicket {
  export type Input = {
    eventId: string
    totalQuantity: number
    reamingQuantity: number
  }
  export type Output = { id: string }
}
