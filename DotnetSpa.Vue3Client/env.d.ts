/// <reference types="vite/client" />

import { ComponentCustomProperties } from 'vue'
import type { ReturnType } from './src/services/useCustomerService'
import type { useCustomerService } from './src/services/useCustomerService'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $customerService: ReturnType<typeof useCustomerService>
  }
}
