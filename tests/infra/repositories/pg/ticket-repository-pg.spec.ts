import PrismaConnection from '@/infra/repositories/helpers/connection'
import TicketRepository from '@/infra/repositories/pg/ticket-repository-pg'

describe('PgEventRepo', () => {
  let sut: TicketRepository
  let eventResponse: any
  const prisma = PrismaConnection.getConnection()

  beforeEach(async () => {
    await prisma.ticket.deleteMany()
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
    sut = new TicketRepository()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('Create', () => {
    it('should return undefined if email does not exists', async () => {
      const ticket = await sut.create({
        eventId: eventResponse?.id,
        totalQuantity: 500,
        reamingQuantity: 500
      })
      expect(ticket).toBeDefined()
    })
  })
})
