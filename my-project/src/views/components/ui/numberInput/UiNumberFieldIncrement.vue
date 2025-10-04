<script setup lang="ts">
import { injectNumberFieldContext } from './UiNumberFieldRoot.vue'

const context = injectNumberFieldContext()
</script>

<template>
  <button
      type="button"
      :disabled="!context.canIncrement.value"
      :aria-label="'Increase value'"
      class="h-full px-2 bg-[#E7E7EF] disabled:opacity-50 focus:outline-0 flex items-center justify-center text-sm"
      @click="context.handleIncrement"
  >
    <slot>
      <span aria-hidden="true">+</span>
    </slot>
  </button>
</template>
