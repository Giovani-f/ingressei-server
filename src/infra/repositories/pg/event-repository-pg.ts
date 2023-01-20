import EventRepository, { CreateEvent } from '@/domain/repositories/event-repository'
import PrismaConnection from '@/infra/repositories/helpers/connection'

import { PrismaClient } from '@prisma/client'

export default class EventRepositoryPG implements EventRepository {
  connection: PrismaClient
  constructor () {
    this.connection = PrismaConnection.getConnection()
  }

  async create (input: CreateEvent.Input): Promise<CreateEvent.Output> {
    const event = await this.connection.event.create({
      data: {
        name: input.name,
        date: input.date,
        address: input.address,
        type: input.type
      }
    })

    return { id: event.id }
  }
}
