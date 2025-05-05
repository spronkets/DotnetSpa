export default class OrderModel {
  constructor(
    public id: number,
    public customerId: number,
    public totalPrice: number
  ) {}
}
