<template>
  <div class="customer-orders">
    <p v-if="loading">Getting Orders for Customer...</p>
    <table v-else-if="hasOrders">
      <caption>{{ customer.firstName }} {{ customer.lastName }}'s Orders</caption>
      <thead>
        <tr class="table-header">
          <td>Id</td>
          <td>Total Price</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.totalPrice }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No Orders found.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const loading = ref(false);

const customer = computed(() => store.state.selectedCustomer);
const orders = computed(() => store.state.selectedCustomerOrders);
const hasOrders = computed(() => orders.value && orders.value.length > 0);

onMounted(() => {
  if (!hasOrders.value) {
    refreshOrders();
  }
});

function refreshOrders(): void {
  loading.value = true;
  store.dispatch('refreshCustomerOrders').finally(() => {
    loading.value = false;
  });
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/common';
</style>
