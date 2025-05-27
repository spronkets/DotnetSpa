<template>
  <div class="dashboard">
    <h2>Dashboard</h2>

    <Customers
      :customers="customers"
      :loading="loading"
      :selected-customer-id="selectedCustomer?.id"
      @select="onCustomerSelect"
      @update="onCustomerUpdate"
      @delete="onCustomerDelete"
    />

    <CustomerOrders
      v-if="hasSelectedCustomer"
      :customer="selectedCustomer"
      :orders="selectedCustomerOrders"
      :loading="loading"
      :has-orders="hasOrders"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Customers from '@/components/customers.vue'
import CustomerOrders from '@/components/customer-orders.vue'
import { useCustomerService } from '@/services/customerService'
import { type Customer } from '@/models/customer'

const {
  customers,
  selectedCustomer,
  selectedCustomerOrders,
  loading,
  hasSelectedCustomer,
  hasOrders,
  selectCustomer,
  saveCustomerChanges,
  removeCustomer,
  refreshCustomers,
} = useCustomerService()

onMounted(() => {
  refreshCustomers()
})

const onCustomerSelect = (customer: Customer) => {
  selectCustomer(customer)
}

const onCustomerUpdate = (customer: Customer) => {
  saveCustomerChanges(customer)
}

const onCustomerDelete = (customerId: number) => {
  removeCustomer(customerId)
}

</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  h2 {
    margin: 0;
  }
}
</style>
