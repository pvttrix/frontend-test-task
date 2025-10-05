<script setup lang="ts">
import { computed } from 'vue';
import UiButton from '../ui/UiButton.vue';
import { formatPrice } from '../../../utils/formatter.ts';
import type { CartItem } from '../../../models/internal/cart.ts';
import UiNumberField from '../ui/UiNumberField.vue';

interface Props {
  item: CartItem;
}

interface Emits {
  (e: 'remove', id: number): void;
  (e: 'update:quantity', id: number, quantity: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const quantity = computed({
  get: () => props.item.quantity,
  set: (value: number) => {
    emit('update:quantity', props.item.product.id, value);
  },
});

const itemTotal = computed(() => props.item.product.price * props.item.quantity);

const handleRemove = () => {
  emit('remove', props.item.product.id);
};
</script>

<template>
  <!-- Desktop: Table Row -->
  <tr class="hidden md:table-row border-b border-[#E1E1E4] hover:bg-gray-50 transition-colors">
    <td class="xl:pr-32 lg:pr-16 md:pr-20 py-4 px-6">
      <div class="flex gap-3">
        <div class="relative flex-shrink-0">
          <img :src="item.product.image" :alt="item.product.title" width="80" height="80" class="object-contain" />
          <UiButton
            variant="dark"
            icon-only
            size="sm"
            class="absolute -top-2 -right-2 bg-black"
            :aria-label="`Remove ${item.product.title} from cart`"
            @click="handleRemove">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </UiButton>
        </div>
        <div class="min-w-0">
          <h3 class="text-base font-medium text-navy-blue line-clamp-2">
            {{ item.product.title }}
          </h3>
          <p class="text-sm text-light-gray capitalize mt-1">
            {{ item.product.category }}
          </p>
        </div>
      </div>
    </td>

    <td class="xl:pr-32 lg:pr-16 py-4">
      <span class="text-navy-blue font-medium">${{ item.product.price.toFixed(2) }}</span>
    </td>

    <td class="xl:pr-32 lg:pr-16 md:pr-20 py-4">
      <UiNumberField v-model="quantity" class="h-5" :max="item.product.rating.count" :min="1" />
    </td>

    <td class="py-4">
      <span class="text-base font-medium text-navy-blue">
        {{ formatPrice(itemTotal) }}
      </span>
    </td>

    <!-- Empty cell for alignment -->
    <td class="py-4 pr-6"></td>
  </tr>

  <!-- Mobile: Card -->
  <div class="md:hidden bg-white rounded-lg shadow p-4 border border-gray-200">
    <div class="flex gap-3 mb-4">
      <div class="relative flex-shrink-0">
        <img
          :src="item.product.image"
          :alt="item.product.title"
          width="80"
          height="80"
          class="object-contain rounded" />
        <UiButton
          variant="dark"
          icon-only
          size="sm"
          class="absolute -top-2 -right-2 bg-black"
          :aria-label="`Remove ${item.product.title} from cart`"
          @click="handleRemove">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </UiButton>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-medium text-navy-blue line-clamp-2">
          {{ item.product.title }}
        </h3>
        <p class="text-xs text-light-gray capitalize mt-1">
          {{ item.product.category }}
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
      <span class="text-sm font-medium text-light-gray">Price:</span>
      <span class="text-base font-medium text-navy-blue">${{ item.product.price.toFixed(2) }}</span>
    </div>

    <div class="flex items-center justify-between">
      <div>
        <span class="text-sm font-medium text-light-gray block mb-2">Quantity:</span>
        <UiNumberField v-model="quantity" :max="item.product.rating.count" :min="1" />
      </div>

      <div class="text-right text-base font-medium">
        <span class="text-light-gray block mb-2">Total:</span>
        <span class="text-navy-blue">
          {{ formatPrice(itemTotal) }}
        </span>
      </div>
    </div>
  </div>
</template>
