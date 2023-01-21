import PrismaConnection from '@/infra/repositories/helpers/connection'
import BatchRepositoryPG from '@/infra/repositories/pg/batch-repository-pg'

describe('PgBatchRepo', () => {
  let sut: BatchRepositoryPG
  let eventResponse: any
  let ticketResponse: any
  const prisma = PrismaConnection.getConnection()

  beforeEach(async () => {
    const deleteEvent = prisma.event.deleteMany()
    const deleteTicket = prisma.ticket.deleteMany()
    const deleteBatch = prisma.batch.deleteMany()
    await prisma.$transaction([deleteBatch, deleteTicket, deleteEvent])

    await prisma.event.create({
      data: {
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
      }
    })
    eventResponse = await prisma.event.findFirst({
      where: {
        name: 'any_name'
      }
    })

    await prisma.ticket.create({
      data: {
        event_id: eventResponse.id,
        total_quantity: 500,
        reaming_quantity: 500
      }
    })

    ticketResponse = await prisma.ticket.findFirst()

    sut = new BatchRepositoryPG()
  })

  afterAll(async () => {
    const deleteEvent = prisma.event.deleteMany()
    const deleteTicket = prisma.ticket.deleteMany()
    const deleteBatch = prisma.batch.deleteMany()
    await prisma.$transaction([deleteBatch, deleteTicket, deleteEvent])

    await prisma.$disconnect()
  })

  describe('Create', () => {
    it('should create 1 batch', async () => {
      await sut.createMany([
        {
          ticketId: ticketResponse.id,
          quantity: 300,
          price: 99.90,
          startDate: 'any_date',
          endDate: 'any_date'
        }
      ])

      const batch = await prisma.ticket.findUnique({
        where: {
          id: ticketResponse.id
        }
      })

      expect(batch).toBeDefined()
    })
  })
})
