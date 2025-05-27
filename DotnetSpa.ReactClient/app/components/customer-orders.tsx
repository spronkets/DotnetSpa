import React from 'react'
import styles from './customer-orders.module.scss'
import type { Customer } from '../models/customer'
import type { Order } from '../models/order'

interface CustomerOrdersProps {
  customer?: Customer
  orders: Order[]
  loading: boolean
  hasOrders: boolean
}

const CustomerOrders: React.FC<CustomerOrdersProps> = ({
  customer,
  orders,
  loading,
  hasOrders,
}) => {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value)

  if (!customer) return null

  return (
    <div className={styles.customerOrders}>
      {loading ? (
        <p>Getting Orders for Customer...</p>
      ) : hasOrders ? (
        <table>
          <caption>
            {customer.firstName} {customer.lastName}&apos;s Orders
          </caption>
          <thead>
            <tr className={styles.tableHeader}>
              <td>Id</td>
              <td>Total Price</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{formatCurrency(order.totalPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Orders found.</p>
      )}
    </div>
  )
}

export default CustomerOrders
