<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  min?: number;
  max?: number;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  min: 1,
  max: 99,
  ariaLabel: 'Quantity',
});

const model = defineModel<number>({ required: true });
const inputValue = ref(String(model.value));

watch(model, newValue => {
  inputValue.value = String(newValue);
});

const clamp = (value: number) => Math.max(props.min, Math.min(props.max, value));

const increment = () => {
  if (model.value < props.max) model.value++;
};

const decrement = () => {
  if (model.value > props.min) model.value--;
};

const handleInput = (e: Event) => {
  inputValue.value = (e.target as HTMLInputElement).value;
  const parsed = parseInt(inputValue.value, 10);
  if (!isNaN(parsed)) model.value = clamp(parsed);
};

const handleBlur = () => {
  const parsed = parseInt(inputValue.value, 10);
  const fixed = isNaN(parsed) ? model.value : clamp(parsed);
  model.value = fixed;
  inputValue.value = String(fixed);
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    increment();
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    decrement();
  }
};
</script>

<template>
  <div
    role="group"
    :aria-label="ariaLabel"
    class="flex items-center w-fit shadow-sm overflow-hidden h-8 border border-gray-300 rounded">
    <button
      type="button"
      @click="decrement"
      :disabled="model <= min"
      :aria-label="`Decrease ${ariaLabel.toLowerCase()}`"
      class="w-8 h-full flex items-center justify-center bg-[#E7E7EF] text-[#BEBFC2] hover:bg-gray-200 active:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
      <span aria-hidden="true">−</span>
    </button>

    <input
      type="text"
      inputmode="numeric"
      :value="inputValue"
      :aria-label="ariaLabel"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="model"
      role="spinbutton"
      @input="handleInput"
      @blur="handleBlur"
      @keydown="handleKeydown"
      class="w-12 h-full text-center border-x border-gray-300 bg-[#F0EFF2] text-navy-blue text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors" />

    <button
      type="button"
      @click="increment"
      :disabled="model >= max"
      :aria-label="`Increase ${ariaLabel.toLowerCase()}`"
      class="w-8 h-full flex items-center justify-center bg-[#E7E7EF] text-[#BEBFC2] hover:bg-gray-200 active:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
      <span aria-hidden="true">+</span>
    </button>
  </div>
</template>
