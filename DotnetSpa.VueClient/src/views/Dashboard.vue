<template>
  <div class="dashboard">
    <Customers />
    <CustomerOrders v-if="hasSelectedCustomer" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Customers from "@/components/Customers.vue";
import CustomerOrders from "@/components/CustomerOrders.vue";

@Component({
  components: {
    Customers,
    CustomerOrders
  }
})
export default class Dashboard extends Vue {
  get hasSelectedCustomer(): boolean {
    return !!this.$store.state.selectedCustomer;
  }
}
</script>

<style lang="scss" scoped>
</style>
