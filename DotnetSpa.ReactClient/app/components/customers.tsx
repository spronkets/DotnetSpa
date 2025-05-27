import React from 'react'
import styles from './customers.module.scss'
import EditCustomer from './edit-customer'
import type { Customer } from '../models/customer'

interface CustomersProps {
  loading: boolean
  customers: Customer[]
  selectedCustomerId?: number
  onSelect: (customer: Customer) => void
  onUpdate: (customer: Customer) => void
  onDelete: (id: number) => void
  onCancel?: () => void
}

const Customers: React.FC<CustomersProps> = ({
  loading,
  customers,
  selectedCustomerId,
  onSelect,
  onUpdate,
  onDelete,
  onCancel,
}) => {
  if (loading) return <p>Getting Customers...</p>

  return (
    <div className={styles.customers}>
      {customers.length > 0 ? (
        <table>
          <caption>Customers</caption>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className={customer.id === selectedCustomerId ? styles.selected : ''}
                onClick={() => onSelect(customer)}
              >
                <td>{customer.id}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>
                  <EditCustomer
                    customer={customer}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onCancel={onCancel}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Customers found.</p>
      )}
    </div>
  )
}

export default Customers
