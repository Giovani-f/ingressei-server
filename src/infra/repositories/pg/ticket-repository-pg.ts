import TicketRepository, { CreateTicket } from '@/domain/repositories/ticket-repository'
import PrismaConnection from '@/infra/repositories/helpers/connection'

import { PrismaClient } from '@prisma/client'

export default class TicketRepositoryPG implements TicketRepository {
  connection: PrismaClient
  constructor () {
    this.connection = PrismaConnection.getConnection()
  }

  async create (input: CreateTicket.Input): Promise<CreateTicket.Output> {
    const ticket = await this.connection.ticket.create({
      data: {
        event_id: input.eventId,
        total_quantity: input.totalQuantity,
        reaming_quantity: input.reamingQuantity
      }
    })

    return { id: ticket.id }
  }
}
