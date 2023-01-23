import PrismaConnection from '@/infra/repositories/helpers/connection'
import EventRepositoryPG from '@/infra/repositories/pg/event-repository-pg'

describe('PgEventRepo', () => {
  let sut: EventRepositoryPG
  const prisma = PrismaConnection.getConnection()

  beforeEach(async () => {
    const deleteEvent = prisma.event.deleteMany()
    const deleteTicket = prisma.ticket.deleteMany()
    const deleteBatch = prisma.batch.deleteMany()
    await prisma.$transaction([deleteBatch, deleteTicket, deleteEvent])
    sut = new EventRepositoryPG()
  })

  afterAll(async () => {
    const deleteEvent = prisma.event.deleteMany()
    const deleteTicket = prisma.ticket.deleteMany()
    const deleteBatch = prisma.batch.deleteMany()
    await prisma.$transaction([deleteBatch, deleteTicket, deleteEvent])

    await prisma.$disconnect()
  })

  describe('Create', () => {
    it('should create 1 event', async () => {
      const event = await sut.create({
        name: 'any_name',
        address: {
          country: 'any_address',
          city: 'any_address',
          zipCode: 'any_address',
          street: 'any_address',
          neighborhood: 'any_address',
          localNumber: 100
        },
        date: 'any_date',
        type: 'University'
      })

      expect(event).toBeDefined()
    })
  })

  describe('Create', () => {
    beforeEach(async () => {
      const event = await prisma.event.create({
        data: {
          name: 'specific name of event',
          address: {
            country: 'any_address',
            city: 'any_address',
            zipCode: 'any_address',
            street: 'any_address',
            neighborhood: 'any_address',
            localNumber: 100
          },
          date: 'any_date',
          type: 'University'
        }
      })

      const ticket = await prisma.ticket.create({
        data: {
          event_id: event.id,
          total_quantity: 500,
          reaming_quantity: 500
        }
      })

      await prisma.batch.createMany({
        data: [
          {
            ticket_id: ticket.id,
            quantity: 300,
            price: 99.90,
            start_date: 'any_date',
            end_date: 'any_date'
          }
        ]
      })
    })

    it('should search event by name', async () => {
      const event = await sut.search('specific name of event')

      expect(event).toEqual([
        {
          id: expect.any(String),
          name: 'specific name of event',
          address: {
            city: 'any_address',
            street: 'any_address',
            country: 'any_address',
            zipCode: 'any_address',
            localNumber: 100,
            neighborhood: 'any_address'
          },
          date: 'any_date',
          type: 'University',
          ticket: {
            id: expect.any(String),
            totalQuantity: 500,
            reamingQuantity: 500,
            batchs: [
              {
                id: expect.any(String),
                quantity: 300,
                price: 99.9,
                startDate: 'any_date',
                endDate: 'any_date'
              }
            ]
          }
        }
      ])
    })

    it('should search event by type', async () => {
      const event = await sut.search('University')

      expect(event).toEqual([
        {
          id: expect.any(String),
          name: 'specific name of event',
          address: {
            city: 'any_address',
            street: 'any_address',
            country: 'any_address',
            zipCode: 'any_address',
            localNumber: 100,
            neighborhood: 'any_address'
          },
          date: 'any_date',
          type: 'University',
          ticket: {
            id: expect.any(String),
            totalQuantity: 500,
            reamingQuantity: 500,
            batchs: [
              {
                id: expect.any(String),
                quantity: 300,
                price: 99.9,
                startDate: 'any_date',
                endDate: 'any_date'
              }
            ]
          }
        }
      ])
    })

    it('should return empty array when searching for a type that does not exist', async () => {
      const event = await sut.search('abc')

      expect(event).toEqual([])
    })
  })
})
