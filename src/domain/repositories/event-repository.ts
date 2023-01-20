export default interface EventRepository {
  create: (input: CreateEvent.Input) => Promise<CreateEvent.Output>
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
