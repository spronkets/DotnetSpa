<template>
  <div class="dashboard">
    <Customers />
    <CustomerOrders v-if="hasSelectedCustomer" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import Customers from '@/components/Customers.vue';
  import CustomerOrders from '@/components/CustomerOrders.vue';

  const store = useStore();

  const hasSelectedCustomer = computed(() => !!store.state.selectedCustomer);
</script>

<style lang="scss" scoped>
</style>
