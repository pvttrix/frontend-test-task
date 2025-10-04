<script setup lang="ts">
import { injectNumberFieldContext } from './UiNumberFieldRoot.vue'

const context = injectNumberFieldContext()
</script>

<template>
  <input
      :id="context.id.value"
      type="text"
      :value="context.modelValue.value"
      :min="context.min.value"
      :max="context.max.value"
      :disabled="context.disabled.value"
      :readonly="context.readonly.value"
      role="spinbutton"
      :aria-valuenow="context.modelValue.value"
      :aria-valuemin="context.min.value"
      :aria-valuemax="context.max.value"
      inputmode="numeric"
      class="flex-1 h-full tabular-nums bg-[#F0EFF2] text-center text-[#BEBFC2] focus:outline-0 border-0 text-sm"
      @input="context.handleInput"
      @blur="context.handleBlur"
      @keydown="context.handleKeyDown"
  />
</template>
