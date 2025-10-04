<script setup lang="ts">
import { computed, ref } from 'vue'

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
const hasError = ref(false) // добавили

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
  hasError.value = false
}

const handleDecrease = () => {
  if (!canDecrement.value) return
  model.value = clampValue(model.value - props.step)
  hasError.value = false
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)

  if (!isNaN(value)) {
    // НЕ обрезаем! Просто присваиваем
    model.value = value

    // Проверяем валидность для подсветки
    hasError.value = (
        (props.min !== undefined && value < props.min) ||
        (props.max !== undefined && value > props.max)
    )
  } else {
    hasError.value = true
  }
}

const handleBlur = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)

  if (isNaN(value)) {
    target.value = String(model.value)
  } else {
    // Обрезаем ТОЛЬКО при blur
    const clamped = clampValue(value)
    model.value = clamped
    target.value = String(clamped)
  }

  hasError.value = false
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
  hasError: computed(() => hasError.value), // добавили
  handleIncrement,
  handleDecrease,
  handleInput,
  handleBlur,
  handleKeyDown,
})
</script>