<script setup lang="ts">
import { injectNumberFieldContext } from './UiNumberFieldRoot.vue'

const context = injectNumberFieldContext()
</script>

<template>
  <button
    type="button"
    :disabled="!context.canDecrement.value"
    :aria-label="'Decrease value'"
    class="h-full px-2 disabled:opacity-50 focus:outline-0 flex items-center justify-center text-sm"
    style="background-color: #E7E7EF;"
    @click="context.handleDecrease"
  >
    <slot>
      <span aria-hidden="true">−</span>
    </slot>
  </button>
</template>
