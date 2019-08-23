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
      <tr v-for="customer in customers" v-bind:key="customer.id" v-on:click="selectCustomer(customer)" v-bind:class="{ selected: isCustomerSelected(customer.id) }">
        <td>{{customer.id}}</td>
        <td>{{customer.firstName}}</td>
        <td>{{customer.lastName}}</td>
        <td><EditCustomer :customer="customer" /></td>
      </tr>
    </table>
    <p v-else>No Customers found.</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomerModel from '@/models/customer';
import EditCustomer from '@/components/EditCustomer.vue';

@Component({
  components: {
    EditCustomer
  }
})
export default class Customers extends Vue {
  loading: boolean = false;

  mounted(): void {
    if(!this.hasCustomers){
      this.refreshCustomers();
    }
  }

  get hasCustomers(): boolean {
    return !!this.customers && this.customers.length > 0;
  }

  get customers(): CustomerModel[] {
   const customers = this.$store.state.customers;
   return customers;
  }

  refreshCustomers(): void {
    this.loading = true;
    this.$store.dispatch('refreshCustomers')
      .finally(() => this.loading = false);
  }

  selectCustomer(customer: CustomerModel): void {
    this.$store.commit('selectCustomer', customer);
  }

  get selectedCustomer(): CustomerModel {
   return this.$store.state.selectedCustomer;
  }

  isCustomerSelected(customerId: number): boolean {
    return !!this.selectedCustomer && this.selectedCustomer.id === customerId;
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/common';

  tr:not(:first-child) {
    cursor: pointer;

    &.selected {
      background-color: $highlighterColor;
    }
  }
</style>
