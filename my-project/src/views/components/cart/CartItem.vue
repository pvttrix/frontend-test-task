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
  <tr class="hidden border-b border-[#E1E1E4] transition-colors hover:bg-gray-50 md:table-row">
    <td class="px-6 py-4 md:pr-20 lg:pr-16 xl:pr-32">
      <div class="flex gap-3">
        <div class="relative flex-shrink-0">
          <img
            :src="item.product.image"
            :alt="item.product.title"
            width="80"
            height="80"
            class="object-contain" />
          <UiButton
            variant="dark"
            icon-only
            size="sm"
            class="absolute -top-2 -right-2 bg-black"
            :aria-label="`Remove ${item.product.title} from cart`"
            @click="handleRemove">
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </UiButton>
        </div>
        <div class="min-w-0">
          <h3 class="text-navy-blue line-clamp-2 text-base font-medium">
            {{ item.product.title }}
          </h3>
          <p class="text-light-gray mt-1 text-sm capitalize">
            {{ item.product.category }}
          </p>
        </div>
      </div>
    </td>

    <td class="py-4 lg:pr-16 xl:pr-32">
      <span class="text-navy-blue font-medium">${{ item.product.price.toFixed(2) }}</span>
    </td>

    <td class="py-4 md:pr-20 lg:pr-16 xl:pr-32">
      <UiNumberField
        v-model="quantity"
        :aria-label="`Quantity for ${item.product.title}`"
        class="h-5"
        :max="item.product.rating.count"
        :min="1" />
    </td>

    <td class="py-4">
      <span class="text-navy-blue text-base font-medium">
        {{ formatPrice(itemTotal) }}
      </span>
    </td>

    <!-- Empty cell for alignment -->
    <td class="py-4 pr-6"></td>
  </tr>

  <!-- Mobile: Card -->
  <div class="rounded-lg border border-gray-200 bg-white p-4 shadow md:hidden">
    <div class="mb-4 flex gap-3">
      <div class="relative flex-shrink-0">
        <img
          :src="item.product.image"
          :alt="item.product.title"
          width="80"
          height="80"
          class="rounded object-contain" />
        <UiButton
          variant="dark"
          icon-only
          size="sm"
          class="absolute -top-2 -right-2 bg-black"
          :aria-label="`Remove ${item.product.title} from cart`"
          @click="handleRemove">
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </UiButton>
      </div>
      <div class="min-w-0 flex-1">
        <h3 class="text-navy-blue line-clamp-2 text-sm font-medium">
          {{ item.product.title }}
        </h3>
        <p class="text-light-gray mt-1 text-xs capitalize">
          {{ item.product.category }}
        </p>
      </div>
    </div>

    <div class="mb-3 flex items-center justify-between border-b border-gray-200 pb-3">
      <span class="text-light-gray text-sm font-medium">Price:</span>
      <span class="text-navy-blue text-base font-medium">${{ item.product.price.toFixed(2) }}</span>
    </div>

    <div class="flex items-center justify-between">
      <div>
        <span class="text-light-gray mb-2 block text-sm font-medium">Quantity:</span>
        <UiNumberField
          v-model="quantity"
          :aria-label="`Quantity for ${item.product.title}`"
          :max="item.product.rating.count"
          :min="1" />
      </div>

      <div class="text-right text-base font-medium">
        <span class="text-light-gray mb-2 block">Total:</span>
        <span class="text-navy-blue">
          {{ formatPrice(itemTotal) }}
        </span>
      </div>
    </div>
  </div>
</template>
