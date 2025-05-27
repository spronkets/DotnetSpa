<template>
  <div class="customers">
    <p v-if="loading">Getting Customers...</p>
    <table v-else-if="customers.length > 0">
      <caption>Customers</caption>
      <tr class="table-header">
        <td>Id</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td></td>
      </tr>
      <tr
        v-for="customer in customers"
        :key="customer.id"
        @click="() => onCustomerSelect(customer)"
        :class="{ selected: customer.id === selectedCustomerId }"
      >
        <td>{{ customer.id }}</td>
        <td>{{ customer.firstName }}</td>
        <td>{{ customer.lastName }}</td>
        <td>
          <EditCustomer
            :customer="customer"
            @update="onCustomerUpdate"
            @delete="onCustomerDelete"
            @cancel="onCustomerCancel"
          />
        </td>
      </tr>
    </table>
    <p v-else>No Customers found.</p>
  </div>
</template>

<script setup lang="ts">
import EditCustomer from '@/components/edit-customer.vue'
import { type Customer } from '@/models/customer'

const props = defineProps<{
  loading: boolean
  customers: Customer[]
  selectedCustomerId: number | undefined
}>()

const emit = defineEmits<{
  (e: 'select', customer: Customer): void
  (e: 'update', customer: Customer): void
  (e: 'delete', id: number): void
  (e: 'cancel'): void
}>()

const onCustomerSelect = (customer: Customer) => {
  emit('select', customer)
}


const onCustomerUpdate = (customer: Customer) => {
  emit('update', customer)
}

const onCustomerDelete = (id: number) => {
  emit('delete', id)
}

const onCustomerCancel = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/common';

tr:not(:first-child) {
  cursor: pointer;

  &.selected {
    background-color: $highlighterColor;
  }
}
</style>
