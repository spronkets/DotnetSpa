<template>
  <div v-if="customer" class="customer-orders">
    <p v-if="loading">Getting Orders for Customer...</p>
    <table v-else-if="hasOrders">
      <caption>
        {{
          customer.firstName
        }}
        {{
          customer.lastName
        }}'s Orders
      </caption>
      <thead>
        <tr class="table-header">
          <td>Id</td>
          <td>Total Price</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ formatCurrency(order.totalPrice) }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No Orders found.</p>
  </div>
</template>

<script setup lang="ts">
import type { Customer } from '@/models/customer'
import type { Order } from '@/models/order'

defineProps<{
  customer: Customer | undefined
  orders: Order[]
  loading: boolean
  hasOrders: boolean
}>()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/common';
</style>
