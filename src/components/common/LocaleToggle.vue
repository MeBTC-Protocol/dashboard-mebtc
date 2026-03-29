<script setup lang="ts">
import { useLocale } from '../../composables/useLocale'
import type { Locale } from '../../i18n'

const { locale, setLocale } = useLocale()

const options: { value: Locale; label: string }[] = [
  { value: 'de', label: 'DE' },
  { value: 'en', label: 'EN' },
]
</script>

<template>
  <div class="locale-toggle">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      :class="['locale-btn', locale === opt.value ? 'locale-active' : '']"
      @click="setLocale(opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped>
.locale-toggle {
  display: inline-flex;
  border: var(--ui-border-width) solid var(--ui-border);
  border-radius: var(--ui-radius-md);
  overflow: hidden;
}

.locale-btn {
  padding: 3px 9px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: transparent;
  color: var(--ui-text-muted);
  border: none;
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}

.locale-btn + .locale-btn {
  border-left: var(--ui-border-width) solid var(--ui-border);
}

.locale-btn:hover {
  color: var(--ui-text);
}

.locale-active {
  background: var(--ui-accent);
  color: #fff;
}
</style>
