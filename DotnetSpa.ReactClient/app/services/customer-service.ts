import { useState, useMemo, useCallback } from "react";
import axios from "axios";
import type { Customer } from "../models/customer";
import type { Order } from "../models/order";
import type { MergeCustomer } from "../models/merge-customer";

export function useCustomerService() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState<Order[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Computed equivalents
  const hasCustomers = useMemo(() => customers.length > 0, [customers]);
  const hasSelectedCustomer = useMemo(
    () => !!selectedCustomer,
    [selectedCustomer]
  );
  const hasOrders = useMemo(
    () => selectedCustomerOrders.length > 0,
    [selectedCustomerOrders]
  );

  const refreshCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:44314/api/customers");
      setCustomers(response.data);
      setSelectedCustomer(undefined);
      setSelectedCustomerOrders([]);
    } catch {
      alert("Error loading customers.");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshCustomerOrders = useCallback(async () => {
    if (!selectedCustomer) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:44314/api/customer/${selectedCustomer.id}/orders`
      );
      setSelectedCustomerOrders(response.data);
    } catch {
      alert("Error loading customer orders.");
    } finally {
      setLoading(false);
    }
  }, [selectedCustomer]);

  const selectCustomer = useCallback(
    (customer: Customer) => {
      if (!selectedCustomer || selectedCustomer.id !== customer.id) {
        setSelectedCustomer(customer);
        setSelectedCustomerOrders([]);
        // Immediately fetch orders for selected customer
        setTimeout(refreshCustomerOrders, 0); // avoid stale `selectedCustomer`
      } else {
        setSelectedCustomer(undefined);
        setSelectedCustomerOrders([]);
      }
    },
    [selectedCustomer, refreshCustomerOrders]
  );

  const isCustomerSelected = useCallback(
    (customerId: number) => selectedCustomer?.id === customerId,
    [selectedCustomer]
  );

  const saveCustomerChanges = useCallback(
    async (customer: Customer) => {
      const mergeCustomer: MergeCustomer = {
        firstName: customer.firstName,
        lastName: customer.lastName,
      };

      setLoading(true);
      try {
        await axios.put(
          `https://localhost:44314/api/customer/${customer.id}`,
          mergeCustomer
        );

        setCustomers((prev) => {
          const index = prev.findIndex((c) => c.id === customer.id);
          if (index !== -1) {
            const updated = [...prev];
            updated[index] = { ...updated[index], ...mergeCustomer };
            return updated;
          } else {
            return [...prev, customer];
          }
        });

        if (selectedCustomer?.id === customer.id) {
          setSelectedCustomer((prev) =>
            prev ? { ...prev, ...mergeCustomer } : prev
          );
        }
      } catch {
        alert("Error saving changes to Customer.");
      } finally {
        setLoading(false);
      }
    },
    [selectedCustomer]
  );

  const removeCustomer = useCallback(
    async (customerId: number) => {
      setLoading(true);
      try {
        await axios.delete(
          `https://localhost:44314/api/customer/${customerId}`
        );

        setCustomers((prev) => prev.filter((c) => c.id !== customerId));

        if (selectedCustomer?.id === customerId) {
          setSelectedCustomer(undefined);
          setSelectedCustomerOrders([]);
        }
      } catch {
        alert("Error deleting Customer.");
      } finally {
        setLoading(false);
      }
    },
    [selectedCustomer]
  );

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
  };
}
