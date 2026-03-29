import { reactive } from 'vue'

export type Toast = {
  id: number
  type: 'success' | 'info' | 'error'
  title: string
  txHash?: string
}

let _id = 0
const toasts = reactive<Toast[]>([])

export function useToast() {
  function remove(id: number) {
    const idx = toasts.findIndex(t => t.id === id)
    if (idx !== -1) toasts.splice(idx, 1)
  }

  const MAX_TOASTS = 5

  function add(toast: Omit<Toast, 'id'>, duration = 5000) {
    if (toasts.length >= MAX_TOASTS) toasts.shift()
    const id = ++_id
    toasts.push({ ...toast, id })
    setTimeout(() => remove(id), duration)
  }

  function success(title: string, txHash?: string) {
    add({ type: 'success', title, txHash })
  }

  function info(title: string) {
    add({ type: 'info', title })
  }

  return { toasts, add, remove, success, info }
}
