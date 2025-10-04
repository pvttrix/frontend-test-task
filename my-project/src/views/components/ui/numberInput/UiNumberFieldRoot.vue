<script lang="ts">
import type { Ref } from 'vue'
import { createContext } from '../../../../utils/context.ts'

interface NumberFieldContext {
  modelValue: Ref<number>
  min: Ref<number | undefined>
  max: Ref<number | undefined>
  disabled: Ref<boolean>
  readonly: Ref<boolean>
  id: Ref<string | undefined>
  canIncrement: Ref<boolean>
  canDecrement: Ref<boolean>
  handleIncrement: () => void
  handleDecrease: () => void
  handleInput: (event: Event) => void
  handleBlur: (event: Event) => void
  handleKeyDown: (event: KeyboardEvent) => void
}

export const [injectNumberFieldContext, provideNumberFieldContext] =
    createContext<NumberFieldContext>('UiNumberFieldRoot')
</script>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  readonly?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  disabled: false,
  readonly: false,
})

const model = defineModel<number>({ required: true })

const clampValue = (value: number): number => {
  let clamped = value
  if (props.min !== undefined && clamped < props.min) {
    clamped = props.min
  }
  if (props.max !== undefined && clamped > props.max) {
    clamped = props.max
  }
  return clamped
}

const canDecrement = computed(() => {
  if (props.disabled || props.readonly) return false
  if (props.min === undefined) return true
  return model.value > props.min
})

const canIncrement = computed(() => {
  if (props.disabled || props.readonly) return false
  if (props.max === undefined) return true
  return model.value < props.max
})

const handleIncrement = () => {
  if (!canIncrement.value) return
  model.value = clampValue(model.value + props.step)
}

const handleDecrease = () => {
  if (!canDecrement.value) return
  model.value = clampValue(model.value - props.step)
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)

  if (!isNaN(value)) {
    model.value = clampValue(value)
  }
}

const handleBlur = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)

  if (isNaN(value)) {
    target.value = String(model.value)
  } else {
    const clamped = clampValue(value)
    model.value = clamped
    target.value = String(clamped)
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    handleIncrement()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    handleDecrease()
  }
}

provideNumberFieldContext({
  modelValue: model,
  min: computed(() => props.min),
  max: computed(() => props.max),
  disabled: computed(() => props.disabled),
  readonly: computed(() => props.readonly),
  id: computed(() => props.id),
  canIncrement,
  canDecrement,
  handleIncrement,
  handleDecrease,
  handleInput,
  handleBlur,
  handleKeyDown,
})
</script>

<template>
  <div
      role="group"
      :data-disabled="disabled ? '' : undefined"
  >
    <slot />
  </div>
</template>
