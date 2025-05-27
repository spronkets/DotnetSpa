import { ref, computed } from 'vue'
import type { App } from 'vue'
import axios from 'axios'
import { type Customer } from '@/models/customer'
import { type Order } from '@/models/order'
import { type MergeCustomer } from '@/models/merge-customer'

// State
const customers = ref<Customer[]>([])
const selectedCustomer = ref<Customer | undefined>(undefined)
const selectedCustomerOrders = ref<Order[]>([])
const loading = ref<boolean>(false)

// Computed
const hasCustomers = computed(() => customers.value.length > 0)
const hasSelectedCustomer = computed(() => !!selectedCustomer.value)
const hasOrders = computed(() => selectedCustomerOrders.value.length > 0)

// Methods
const selectCustomer = (customer: Customer): void => {
  if (!selectedCustomer.value || selectedCustomer.value.id !== customer.id) {
    selectedCustomer.value = customer
    selectedCustomerOrders.value = []
    refreshCustomerOrders()
  } else {
    selectedCustomer.value = undefined
    selectedCustomerOrders.value = []
  }
}

const isCustomerSelected = (customerId: number): boolean => {
  return selectedCustomer.value?.id === customerId
}

const refreshCustomers = async (): Promise<void> => {
  loading.value = true
  selectedCustomer.value = undefined
  selectedCustomerOrders.value = []
  try {
    const response = await axios.get('https://localhost:44314/api/customers')
    customers.value = response.data
  } catch {
    alert('Error loading customers.')
  } finally {
    loading.value = false
  }
}

const refreshCustomerOrders = async (): Promise<void> => {
  if (!selectedCustomer.value) return

  loading.value = true
  try {
    const response = await axios.get(
      `https://localhost:44314/api/customer/${selectedCustomer.value.id}/orders`,
    )
    selectedCustomerOrders.value = response.data
  } catch {
    alert('Error loading customer orders.')
  } finally {
    loading.value = false
  }
}

const saveCustomerChanges = async (customer: Customer): Promise<void> => {
  const mergeCustomer: MergeCustomer = {
    firstName: customer.firstName,
    lastName: customer.lastName,
  }

  loading.value = true
  try {
    await axios.put(`https://localhost:44314/api/customer/${customer.id}`, mergeCustomer)
    const customerIndex = customers.value.findIndex((c) => c.id === customer.id)
    if (customerIndex !== -1) {
      customers.value[customerIndex] = { ...customers.value[customerIndex], ...mergeCustomer }
    } else {
      customers.value.push(customer)
    }
  } catch {
    alert('Error saving changes to Customer.')
  } finally {
    loading.value = false
  }
}

const removeCustomer = async (customerId: number): Promise<void> => {
  loading.value = true
  try {
    await axios.delete(`https://localhost:44314/api/customer/${customerId}`)
    const customerIndex = customers.value.findIndex((c) => c.id === customerId)
    if (customerIndex !== -1) {
      customers.value.splice(customerIndex, 1)
    }
    if (selectedCustomer.value?.id === customerId) {
      selectedCustomer.value = undefined
      selectedCustomerOrders.value = []
    }
  } catch {
    alert('Error deleting Customer.')
  } finally {
    loading.value = false
  }
}

// Create the composable
export function useCustomerService() {
  return {
    // State
    customers,
    selectedCustomer,
    selectedCustomerOrders,
    loading,

    // Computed
    hasCustomers,
    hasSelectedCustomer,
    hasOrders,

    // Methods
    selectCustomer,
    isCustomerSelected,
    refreshCustomers,
    refreshCustomerOrders,
    saveCustomerChanges,
    removeCustomer,
  }
}

// Create the plugin
export const customerServicePlugin = {
  install: (app: App) => {
    app.config.globalProperties.$customerService = useCustomerService()
  },
}
