import { PrismaClient } from '@prisma/client'

export default class PrismaConnection {
  static getConnection (): PrismaClient {
    return new PrismaClient()
  }
}
