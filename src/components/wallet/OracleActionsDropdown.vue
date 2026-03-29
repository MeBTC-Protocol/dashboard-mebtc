<script setup lang="ts">
import { ref } from 'vue'
import Button from '../common/Button.vue'
import Card from '../common/Card.vue'
import ErrorPopupInline from '../common/ErrorPopupInline.vue'
import { useLocale } from '../../composables/useLocale'

defineProps<{
  disabled: boolean
  busy: boolean
  error: string
  lastTx: string
  onExecuteEpoch: () => void
}>()

const { t } = useLocale()
const open = ref(false)

function safeCall(fn: () => Promise<unknown> | unknown) {
  Promise.resolve(fn()).catch(() => {})
}

</script>

<template>
  <div style="width:fit-content;">
    <Button size="sm" variant="ghost" :disabled="disabled" @click="open = true">
      <span>{{ t('engine.button') }}</span>
    </Button>
  </div>

  <div v-if="open" class="ui-modal-backdrop" @click.self="open = false">
    <div class="ui-modal">
      <Card :title="t('engine.button')">
        <div style="margin-top:8px;">
          <div class="ui-muted" style="margin-bottom:8px;">
            {{ t('engine.description') }}
          </div>
          <div class="ui-row">
            <Button :disabled="disabled || busy" @click="() => safeCall(onExecuteEpoch)">
              {{ t('engine.execute') }}
            </Button>
          </div>
          <ErrorPopupInline :error="error" context="Engine" />
          <div v-if="lastTx" class="ui-muted" style="margin-top:10px;">
            tx: {{ lastTx }}
          </div>
        </div>

        <div class="ui-row" style="margin-top:14px;">
          <Button size="sm" @click="open = false">{{ t('engine.close') }}</Button>
        </div>
      </Card>
    </div>
  </div>
</template>
