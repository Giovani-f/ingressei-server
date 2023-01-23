import BatchRepository, { CreateBatch } from '@/domain/repositories/bathc-repository'
import PrismaConnection from '@/infra/repositories/helpers/connection'

import { PrismaClient } from '@prisma/client'

export default class BatchRepositoryPG implements BatchRepository {
  connection: PrismaClient
  constructor () {
    this.connection = PrismaConnection.getConnection()
  }

  async createMany (input: CreateBatch.Input[]): Promise<CreateBatch.Output[]> {
    const batchs = await this.connection.$transaction(
      input.map(batch => this.connection.batch.create({
        data: {
          ticket_id: batch.ticketId,
          quantity: batch.quantity,
          price: batch.price,
          start_date: batch.startDate,
          end_date: batch.endDate
        }
      }))
    )
    return batchs.map(batch => {
      return { id: batch.id }
    })
  }
}
