export default interface EventRepository {
  create: (input: CreateEvent.Input) => Promise<CreateEvent.Output>
  search: (input: string) => Promise<SearchEventRepo.Output[]>
}

export namespace CreateEvent {
  export type Input = {
    name: string
    date: string
    address: {
      country: string
      city: string
      zipCode?: string
      street: string
      neighborhood: string
      localNumber: number
    }
    type: string
  }
  export type Output = { id: string }
}

export namespace SearchEventRepo {

  export type Output = {
    id: string
    name: string
    date: string
    address: {
      country: string
      city: string
      zipCode?: string
      street: string
      neighborhood: string
      localNumber: number
    }
    type: string
    ticket: {
      id: string
      totalQuantity: number
      reamingQuantity: number
      batchs: Array<{
        id: string
        quantity: number
        price: number
        startDate: string
        endDate: string
      }>
    }
  } | []
}
