import PrismaConnection from '@/infra/repositories/helpers/connection'
import EventRepositoryPG from '@/infra/repositories/pg/event-repository-pg'

describe('PgEventRepo', () => {
  let sut: EventRepositoryPG
  const prisma = PrismaConnection.getConnection()

  beforeEach(async () => {
    await prisma.event.deleteMany()
    sut = new EventRepositoryPG()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('Create', () => {
    it('should return undefined if email does not exists', async () => {
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
})
