import Item from '@/domain/entities/item'
import OrderItem from '@/domain/entities/order-item'

export default class Order {
  orderItems: OrderItem[]

  constructor (
    readonly cpf: string,
    readonly date: Date = new Date()
  ) {
    this.orderItems = []
  }

  addItem (item: Item, quantity: number): void {
    if (this.orderItems.some(orderItem => orderItem.name === item.name)) throw new Error('Duplicated Item')
    this.orderItems.push(new OrderItem(item.name, item.price, quantity))
  }

  getTotal (): number {
    const total = this.orderItems.reduce((total, orderItem) => {
      total += orderItem.getTotal()
      return total
    }, 0)
    return total
  }
}
