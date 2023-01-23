export default class OrderItem {
  constructor (
    readonly name: string,
    readonly price: number,
    readonly quantity: number
  ) { }

  getTotal (): number {
    return this.price * this.quantity
  }
}
