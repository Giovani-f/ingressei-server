import { ZodValidator } from '@/infra/gateways/zod-validator'
import { schemaExample } from '@/tests/infra/gateways/helpers/schema'

describe('Zod validator', () => {
  let sut: ZodValidator
  const validInput = {
    name: 'any_name',
    address: {
      country: 'any_country',
      city: 'any_city',
      zipCode: 'any_zipcode',
      street: 'any_street',
      neighborhood: 'any_neighborhood',
      localNumber: 500
    },
    date: '2023-01-19T23:16:22.908Z',
    type: 'Company',
    ticket: {
      totalQuantity: 500,
      batchs: [
        {
          quantity: 300,
          price: 89.90,
          startDate: '2023-01-101T23:16:22.908Z',
          endDate: '2023-01-11T23:16:22.908Z'
        }
      ]
    }
  }

  const invalidInput = {
    name: 100,
    address: {
      country: 'any_country',
      city: 'any_city',
      zipCode: 'any_zipcode',
      street: 'any_street',
      neighborhood: 'any_neighborhood',
      localNumber: 500
    },
    date: '2023-01-19T23:16:22.908Z',
    type: 'Company',
    ticket: {
      totalQuantity: 500,
      batchs: [
        {
          quantity: 300,
          price: 89.90,
          startDate: '2023-01-101T23:16:22.908Z',
          endDate: '2023-01-11T23:16:22.908Z'
        }
      ]
    }
  }

  it('should validate a shcema returns undefined', () => {
    sut = new ZodValidator(schemaExample, validInput)

    const validSchema = sut.validate()

    expect(validSchema).toBeUndefined()
  })

  it('should validate a shcema throws error', () => {
    sut = new ZodValidator(schemaExample, invalidInput)

    const validSchema = sut.validate()

    expect(validSchema?.message).toBeDefined()
  })
})
