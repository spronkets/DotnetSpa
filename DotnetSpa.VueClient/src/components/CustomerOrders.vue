<template>
  <div class="customer-orders">
    <p v-if="loading">Getting Orders for Customer...</p>
    <table v-else-if="orders && orders.length > 0">
      <caption>{{customer.firstName}} {{customer.lastName}}'s Orders</caption>
      <tr class="table-header">
        <td>Id</td>
        <td>Total Price</td>
      </tr>
      <tr v-for="order in orders" v-bind:key="order.id">
        <td>{{order.id}}</td>
        <td>{{order.totalPrice}}</td>
      </tr>
    </table>
    <p v-else>No Orders found.</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import store from "@/store";
import OrderModel from "@/models/order";
import CustomerModel from '@/models/customer';

@Component
export default class Orders extends Vue {
  loading: boolean = false;

  mounted(): void {
    if(!this.hasOrders) {
      this.refreshOrders();
    }
  }

  get customer(): CustomerModel {
    return this.$store.state.selectedCustomer;
  }

  get orders(): OrderModel[] {
    return this.$store.state.selectedCustomerOrders;
  }

  get hasOrders(): boolean {
    return !!this.orders && this.orders.length > 0;
  }

  refreshOrders(): void {
    this.loading = true;
      this.$store.dispatch('refreshCustomerOrders')
        .finally(() => this.loading = false);
  }
}
</script>

<style lang="scss" scoped>
</style>
