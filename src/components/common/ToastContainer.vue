<script setup lang="ts">
import { CheckCircle2, Info, X } from 'lucide-vue-next'
import { useToast } from '../../composables/useToast'
import { shortHash } from '../../utils/format'

const { toasts, remove } = useToast()
</script>

<template>
  <TransitionGroup name="toast" tag="div" class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast', `toast-${toast.type}`]"
      role="status"
    >
      <span class="toast-icon">
        <CheckCircle2 v-if="toast.type === 'success'" :size="16" :stroke-width="2" />
        <Info v-else :size="16" :stroke-width="2" />
      </span>
      <div class="toast-body">
        <div class="toast-title">{{ toast.title }}</div>
        <div v-if="toast.txHash" class="toast-tx">{{ shortHash(toast.txHash) }}</div>
      </div>
      <button class="toast-close" type="button" :aria-label="'Schließen'" @click="remove(toast.id)">
        <X :size="13" :stroke-width="2.5" />
      </button>
    </div>
  </TransitionGroup>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 11px 12px 11px 11px;
  border-radius: var(--ui-radius-md);
  border: var(--ui-border-width) solid var(--ui-border);
  background: var(--ui-panel);
  box-shadow: 0 8px 24px -8px var(--ui-shadow-color);
  min-width: 220px;
  max-width: 320px;
  pointer-events: auto;
}

.toast-success .toast-icon {
  color: var(--ui-success);
}

.toast-info .toast-icon {
  color: var(--ui-accent);
}

.toast-icon {
  flex: 0 0 auto;
  margin-top: 1px;
  display: flex;
}

.toast-body {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-text);
  line-height: 1.3;
}

.toast-tx {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: var(--ui-text-muted);
  margin-top: 2px;
}

.toast-close {
  flex: 0 0 auto;
  background: transparent;
  border: none;
  color: var(--ui-text-muted);
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-top: 1px;
}

.toast-close:hover {
  color: var(--ui-text);
}

/* TransitionGroup animations */
.toast-enter-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.toast-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>
