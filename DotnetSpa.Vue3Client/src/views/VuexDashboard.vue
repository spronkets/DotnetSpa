<template>
  <div class="dashboard">
    <Customers
      :customers="customers"
      :loading="loading"
      :selected-customer-id="selectedCustomerId"
      @select="onCustomerSelect"
      @update="onCustomerUpdate"
      @delete="onCustomerDelete"
      @cancel="onCustomerCancel"
    />

    <CustomerOrders
      v-if="hasSelectedCustomer"
      :customer="selectedCustomer"
      :orders="selectedCustomerOrders"
      :loading="ordersLoading"
      :has-orders="hasOrders"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import Customers from '@/components/Customers.vue'
import CustomerOrders from '@/components/CustomerOrders.vue'
import type CustomerModel from '@/models/customer'

const store = useStore()

const loading = ref(true)
const ordersLoading = ref(false)

const customers = computed(() => store.state.customers)
const selectedCustomer = computed(() => store.state.selectedCustomer)
const selectedCustomerOrders = computed(() => store.state.selectedCustomerOrders)
const selectedCustomerId = computed(() => selectedCustomer.value?.id ?? null)

const hasSelectedCustomer = computed(() => !!selectedCustomer.value)
const hasOrders = computed(() => selectedCustomerOrders.value.length > 0)

onMounted(async () => {
  await store.dispatch('refreshCustomers')
  loading.value = false
})

// When a customer is selected
const onCustomerSelect = async (customer: CustomerModel) => {
  store.commit('selectCustomer', customer)
  ordersLoading.value = true
  await store.dispatch('refreshCustomerOrders')
  ordersLoading.value = false
}

const onCustomerUpdate = (customer: CustomerModel) => {
  store.dispatch('saveCustomerChanges', customer)
}

const onCustomerDelete = (id: number) => {
  store.dispatch('removeCustomer', id)
}

const onCustomerCancel = () => {
  // No operation needed for now
}
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
