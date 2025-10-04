<script setup lang="ts">
import UiButton from '../ui/UiButton.vue';
import { useCartStore } from '../../../stores/cart.ts';

const cartStore = useCartStore();
</script>

<template>
  <div
    class="bg-white rounded-lg shadow p-12 text-center"
    role="status"
    aria-live="polite">
    <div class="flex justify-center mb-6">
      <svg
        class="w-24 h-24 text-light-gray"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </div>

    <!-- Title -->
    <h2 class="text-2xl font-semibold text-navy-blue mb-2">Your cart is empty</h2>

    <!-- Description -->
    <p class="text-silver mb-8 max-w-sm mx-auto">
      Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
    </p>

    <!-- Action Button -->
    <UiButton
      variant="success"
      size="lg"
      aria-label="Add first item to cart"
      @click="cartStore.addItem">
      <svg
        class="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Add Item
    </UiButton>
  </div>
</template>
