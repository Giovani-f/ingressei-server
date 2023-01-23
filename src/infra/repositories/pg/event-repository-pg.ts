import EventRepository, { CreateEvent, SearchEventRepo } from '@/domain/repositories/event-repository'
import PrismaConnection from '@/infra/repositories/helpers/connection'

import { PrismaClient } from '@prisma/client'

export default class EventRepositoryPG implements EventRepository {
  connection: PrismaClient
  constructor () {
    this.connection = PrismaConnection.getConnection()
  }

  async search (input: string): Promise<SearchEventRepo.Output[]> {
    const events = await this.connection.event.findMany({
      where: {
        OR: [
          { name: { contains: input } },
          { type: { contains: input } },
          {
            address: {
              path: ['city'],
              string_contains: input
            }
          },
          {
            address: {
              path: ['street'],
              string_contains: input
            }
          },
          {
            address: {
              path: ['neighborhood'],
              string_contains: input
            }
          }
        ]
      },
      include: {
        Ticket: {
          include: { Batch: true }
        }
      }
    })

    if (events.length) {
      return events.map(event => {
        return {
          id: event.id,
          name: event.name,
          address: event.address as Address,
          date: event.date,
          type: event.type,
          ticket: {
            id: event.Ticket!.id,
            totalQuantity: event.Ticket!.total_quantity,
            reamingQuantity: event.Ticket!.reaming_quantity,
            batchs: event.Ticket!.Batch.map(bathc => {
              return {
                id: bathc.id,
                quantity: bathc.quantity,
                price: bathc.price,
                startDate: bathc.start_date,
                endDate: bathc.end_date
              }
            })
          }
        }
      })
    }

    return []
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

type Address = {
  country: string
  city: string
  zipCode?: string
  street: string
  neighborhood: string
  localNumber: number
}
