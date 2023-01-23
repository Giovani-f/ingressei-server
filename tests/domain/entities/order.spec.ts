import Order from '@/domain/entities/order'
import Item from '@/domain/entities/item'

describe('Order enbtity', () => {
  it('should create a order without itens', () => {
    const order = new Order('318.153.361-86')
    const total = order.getTotal()

    expect(total).toBe(0)
  })

  it('should create an order with 1 item', () => {
    const order = new Order('318.153.361-86')
    order.addItem(new Item('any_name', 'any_description', 89.90), 2)

    const total = order.getTotal()

    expect(total).toBe(179.8)
  })

  it("shouldn't add an item with repeating name", () => {
    const order = new Order('318.153.361-86')
    order.addItem(new Item('any_name', 'any_description', 89.90), 2)

    expect(() => order.addItem(new Item('any_name', 'any_description', 89.90), 2)).toThrow(new Error('Duplicated Item'))
  })
})
