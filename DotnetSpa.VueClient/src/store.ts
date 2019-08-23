import Vue from 'vue';
import Vuex from 'vuex';
import axios, { AxiosResponse } from 'axios';
import CustomerModel from '@/models/customer';
import OrderModel from '@/models/order';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    customers: Array<CustomerModel>(),
    selectedCustomer: undefined,
    selectedCustomerOrders: Array<OrderModel>(),
  },
  mutations: {
    selectCustomer(state: any, customer: CustomerModel): void {
      if (
        !state.selectedCustomer ||
        state.selectedCustomer.id !== customer.id
      ) {
        state.selectedCustomer = customer;
        state.selectedCustomerOrders = [];
      } else {
        state.selectedCustomer = undefined;
        state.selectedCustomerOrders = [];
      }
    }
  },
  actions: {
    async refreshCustomers(): Promise<void> {
      const response: AxiosResponse = await axios.get(
        'http://localhost:5000/api/customers'
      );
      this.state.customers = response.data;
    },
    async refreshCustomerOrders(): Promise<void> {
      const customerId: number = this.state.selectedCustomer.id;
      const response: AxiosResponse = await axios.get(
        `http://localhost:5000/api/customer/${customerId}/orders`
      );
      this.state.selectedCustomerOrders = response.data;
    }
  }
});
