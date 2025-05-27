import React, { useEffect } from 'react'
import Customers from '../components/customers'
import CustomerOrders from '../components/customer-orders'
import { useCustomerService } from '../services/customer-service'
import styles from './dashboard.module.scss'

const Dashboard: React.FC = () => {
  const {
    customers,
    selectedCustomer,
    selectedCustomerOrders,
    loading,
    hasSelectedCustomer,
    hasOrders,
    selectCustomer,
    refreshCustomers,
    saveCustomerChanges,
    removeCustomer,
  } = useCustomerService()

  useEffect(() => {
    refreshCustomers()
  }, [])

  const handleCustomerSelect = (customer: typeof selectedCustomer) => {
    if (customer) {
      selectCustomer(customer)
    }
  }

  const handleCustomerUpdate = (customer: typeof selectedCustomer) => {
    if (customer) {
      saveCustomerChanges(customer)
    }
  }

  const handleCustomerDelete = (customerId: number) => {
    removeCustomer(customerId)
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>

      <Customers
        customers={customers}
        loading={loading}
        selectedCustomerId={selectedCustomer?.id}
        onSelect={handleCustomerSelect}
        onUpdate={handleCustomerUpdate}
        onDelete={handleCustomerDelete}
      />

      {hasSelectedCustomer && (
        <CustomerOrders
          customer={selectedCustomer}
          orders={selectedCustomerOrders}
          loading={loading}
          hasOrders={hasOrders}
        />
      )}
    </div>
  )
}

export default Dashboard
