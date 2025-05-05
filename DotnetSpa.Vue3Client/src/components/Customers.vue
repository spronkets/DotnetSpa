<template>
  <div class="customers">
    <p v-if="loading">Getting Customers...</p>
    <table v-else-if="customers && customers.length > 0">
      <caption>Customers</caption>
      <tr class="table-header">
        <td>Id</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td></td>
      </tr>
      <tr v-for="customer in customers" :key="customer.id" @click="selectCustomer(customer)" :class="{ selected: isCustomerSelected(customer.id) }">
        <td>{{ customer.id }}</td>
        <td>{{ customer.firstName }}</td>
        <td>{{ customer.lastName }}</td>
        <td><EditCustomer :customer="customer" /></td>
      </tr>
    </table>
    <p v-else>No Customers found.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import CustomerModel from '@/models/customer';
import EditCustomer from '@/components/EditCustomer.vue';

const store = useStore();

const loading = ref(false);

const customers = computed(() => store.state.customers);
const selectedCustomer = computed(() => store.state.selectedCustomer);
const hasCustomers = computed(() => customers.value && customers.value.length > 0);

onMounted(() => {
  if (!hasCustomers.value) {
    refreshCustomers();
  }
});

function refreshCustomers(): void {
  loading.value = true;
  store.dispatch('refreshCustomers').finally(() => {
    loading.value = false;
  });
}

function selectCustomer(customer: CustomerModel): void {
  store.commit('selectCustomer', customer);
}

function isCustomerSelected(customerId: number): boolean {
  return selectedCustomer.value?.id === customerId;
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
