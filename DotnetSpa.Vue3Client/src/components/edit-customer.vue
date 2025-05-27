<template>
  <button @click.stop="show"><i class="fas fa-user-edit"></i></button>
  <dialog
    ref="dialog"
    role="dialog"
    aria-modal="true"
    aria-labelledby="dialog-title"
    @cancel.stop="onCancel"
    @close.stop="onClose"
    @mousedown.stop="hide"
    @click.stop
  >
    <form method="dialog" @submit.prevent="onSave" @mousedown.stop>
      <header>
        <h3 id="dialog-title">Edit Customer</h3>
        <button type="button" @click.stop="hide" :disabled="loading" class="close-button">
          <i class="fas fa-times"></i>
        </button>
      </header>

      <div class="form-content">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            id="firstName"
            v-model.trim="formCustomer.firstName"
            placeholder="First Name"
            :disabled="loading"
            required
          />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            id="lastName"
            v-model.trim="formCustomer.lastName"
            placeholder="Last Name"
            :disabled="loading"
            required
          />
        </div>
      </div>

      <footer>
        <button type="button" class="delete-button" @click="onDelete" :disabled="loading">
          Delete
        </button>
        <div class="action-buttons">
          <button type="submit" class="save-button" :disabled="loading">Save</button>
          <button type="button" class="cancel-button" @click.stop="hide" :disabled="loading">
            Cancel
          </button>
        </div>
      </footer>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Customer } from '@/models/customer'

const props = defineProps<{
  customer: Customer
}>()

const emit = defineEmits<{
  (e: 'update', updated: Customer): void
  (e: 'delete', id: number): void
  (e: 'cancel'): void
}>()

const dialog = ref<HTMLDialogElement | null>(null)
const formCustomer = reactive<Customer>({ ...props.customer })
const loading = ref(false)

const show = () => {
  Object.assign(formCustomer, props.customer)
  dialog.value?.showModal()
}

const hide = () => {
  if (loading.value) return
  dialog.value?.close()
  emit('cancel')
}

const onSave = async () => {
  loading.value = true
  try {
    emit('update', { ...formCustomer })
    loading.value = false
    hide()
  } catch {
    loading.value = false
  }
}

const onDelete = async () => {
  loading.value = true
  try {
    emit('delete', formCustomer.id)
    loading.value = false
    hide()
  } catch {
    loading.value = false
  }
}

const onCancel = (event: Event) => {
  event.preventDefault()
  hide()
}

const onClose = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/common';

  dialog {
    padding: 1rem;
    border: none;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-height: 8rem;
      min-width: 16rem;
      max-height: calc(100% - 2rem);
      max-width: calc(100% - 2rem);
      cursor: default;
      user-select: none;

      button {
        border: none;
        text-align: center;
        text-decoration: none;
        color: black;
        padding: 0.5rem;
        cursor: pointer;
      }

      header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
          margin: 0;
        }

        button {
          background-color: transparent;
        }
      }

      .form-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      }

      footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;

        .delete-button {
          background-color: red;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .save-button {
          background-color: green;
        }

        .cancel-button {
          background-color: yellow;
        }
      }
    }
  }
</style>
