import type { Commit } from 'vuex'
import { createStore } from 'vuex'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Customer } from '@/models/customer'
import type { Order } from '@/models/order'
import type { MergeCustomer } from '@/models/merge-customer'

interface State {
  customers: Customer[]
  selectedCustomer?: Customer
  selectedCustomerOrders: Order[]
}

const customerStore = createStore<State>({
  state: () => ({
    customers: [],
    selectedCustomer: undefined,
    selectedCustomerOrders: [],
  }),
  mutations: {
    selectCustomer(state: State, customer: Customer): void {
      if (!state.selectedCustomer || state.selectedCustomer.id !== customer.id) {
        state.selectedCustomer = customer
        state.selectedCustomerOrders = []
      } else {
        state.selectedCustomer = undefined
        state.selectedCustomerOrders = []
      }
    },
    updateCustomer(state: State, customer: Customer): void {
      const customerIndex = state.customers.findIndex((c) => c.id === customer.id)
      if (customerIndex !== -1) {
        state.customers.splice(customerIndex, 1, customer)
      } else {
        state.customers.push(customer)
      }

      if (state.selectedCustomer && state.selectedCustomer.id === customer.id) {
        state.selectedCustomer = customer
      }
    },
    deleteCustomer(state: State, customerId: number): void {
      const customerIndex = state.customers.findIndex((c) => c.id === customerId)
      if (customerIndex !== -1) {
        state.customers.splice(customerIndex, 1)
      }
    },
    setCustomers(state: State, customers: Customer[]) {
      state.customers = customers
      state.selectedCustomer = undefined
      state.selectedCustomerOrders = []
    },
    setSelectedCustomerOrders(state: State, orders: Order[]) {
      state.selectedCustomerOrders = orders
    },
  },
  actions: {
    async refreshCustomers({ commit }: { commit: Commit }) {
      try {
        const response: AxiosResponse = await axios.get('https://localhost:44314/api/customers')
        commit('setCustomers', response.data)
      } catch {
        alert('Error loading customers.')
      }
    },
    async refreshCustomerOrders({ commit, state }: { commit: Commit; state: State }) {
      if (!state.selectedCustomer) return
      try {
        const response: AxiosResponse = await axios.get(
          `https://localhost:44314/api/customer/${state.selectedCustomer.id}/orders`,
        )
        commit('setSelectedCustomerOrders', response.data)
      } catch {
        alert('Error loading customer orders.')
      }
    },
    async saveCustomerChanges({ commit }: { commit: Commit }, customer: Customer) {
      const mergeCustomer: MergeCustomer = {
        firstName: customer.firstName,
        lastName: customer.lastName,
      }
      try {
        await axios.put(`https://localhost:44314/api/customer/${customer.id}`, mergeCustomer)
        commit('updateCustomer', customer)
      } catch {
        alert('Error saving changes to Customer.')
      }
    },
    async removeCustomer({ commit }: { commit: Commit }, customerId: number) {
      try {
        await axios.delete(`https://localhost:44314/api/customer/${customerId}`)
        commit('deleteCustomer', customerId)
      } catch {
        alert('Error deleting Customer.')
      }
    },
  },
})

export default customerStore
