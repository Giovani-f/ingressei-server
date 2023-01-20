import Event from '@/domain/entities/event'

export default interface EventRepository {
  create: (event: Event) => Promise<CreateEvent.Output>
}

export namespace CreateEvent {
  export type Output = { id: string }
}
