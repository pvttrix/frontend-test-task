<script setup lang="ts">
import { onMounted } from 'vue';

import { useCartStore } from '../../stores/cart.ts';
import CartLayout from '../layouts/CartLayout.vue';
import CartTable from '../components/cart/CartTable.vue';
import CartTotal from '../components/cart/CartTotal.vue';
import CartShoppingCalculationForm from '../components/cart/CartShoppingCalculationForm.vue';
const cartStore = useCartStore();

onMounted(() => {
  cartStore.initializeCart();
});
</script>

<template>
  <h1 class="visually-hidden">Cart Page</h1>
  <div class="min-h-screen py-8">
    <div class="container mx-auto px-4">
      <div
        v-if="cartStore.isLoading"
        class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
      <div
        v-else-if="cartStore.error"
        class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        {{ cartStore.error }}
      </div>

      <CartLayout v-else>
        <template #main>
          <CartTable />
        </template>
        <template #sidebar>
          <div class="flex flex-col gap-7">
            <CartTotal />
            <CartShoppingCalculationForm />
          </div>
        </template>
      </CartLayout>
    </div>
  </div>
</template>
