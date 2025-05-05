// store/index.ts (or store.ts)
import { createStore } from 'vuex';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import CustomerModel from '@/models/customer';
import OrderModel from '@/models/order';
import MergeCustomerModel from '@/models/merge-customer';

interface State {
  customers: CustomerModel[];
  selectedCustomer?: CustomerModel;
  selectedCustomerOrders: OrderModel[];
}

const store = createStore<State>({
  state: () => ({
    customers: [],
    selectedCustomer: undefined,
    selectedCustomerOrders: []
  }),
  mutations: {
    selectCustomer(state, customer: CustomerModel): void {
      if (!state.selectedCustomer || state.selectedCustomer.id !== customer.id) {
        state.selectedCustomer = customer;
        state.selectedCustomerOrders = [];
      } else {
        state.selectedCustomer = undefined;
        state.selectedCustomerOrders = [];
      }
    },
    mergeCustomer(state, customer: CustomerModel): void {
      const customerIndex = state.customers.findIndex((c) => c.id === customer.id);
      if (customerIndex !== -1) {
        state.customers[customerIndex].firstName = customer.firstName;
        state.customers[customerIndex].lastName = customer.lastName;
      } else {
        state.customers.push(customer);
      }
    },
    deleteCustomer(state, customerId: number): void {
      const customerIndex = state.customers.findIndex((c) => c.id === customerId);
      if (customerIndex !== -1) {
        state.customers.splice(customerIndex, 1);
      }
    },
    setCustomers(state, customers: CustomerModel[]) {
      state.customers = customers;
    },
    setSelectedCustomerOrders(state, orders: OrderModel[]) {
      state.selectedCustomerOrders = orders;
    }
  },
  actions: {
    async refreshCustomers({ commit }) {
      try {
        const response: AxiosResponse = await axios.get(
          'https://localhost:44314/api/customers'
        );
        commit('setCustomers', response.data);
      } catch {
        alert('Error loading customers.');
      }
    },
    async refreshCustomerOrders({ commit, state }) {
      if (!state.selectedCustomer) return;
      try {
        const response: AxiosResponse = await axios.get(
          `https://localhost:44314/api/customer/${state.selectedCustomer.id}/orders`
        );
        commit('setSelectedCustomerOrders', response.data);
      } catch {
        alert('Error loading customer orders.');
      }
    },
    async saveCustomerChanges({ commit }, customer: CustomerModel) {
      const mergeCustomer: MergeCustomerModel = {
        firstName: customer.firstName,
        lastName: customer.lastName
      };
      try {
        await axios.put(`https://localhost:44314/api/customer/${customer.id}`, mergeCustomer);
        commit('mergeCustomer', customer);
      } catch {
        alert('Error saving changes to Customer.');
      }
    },
    async removeCustomer({ commit }, customerId: number) {
      try {
        await axios.delete(`https://localhost:44314/api/customer/${customerId}`);
        commit('deleteCustomer', customerId);
      } catch {
        alert('Error deleting Customer.');
      }
    }
  }
});

export default store;
