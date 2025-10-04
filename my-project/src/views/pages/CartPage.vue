<script setup lang="ts">
import { onMounted } from 'vue'

import {useCartStore} from "../../stores/cart.ts";
import {CartLayout} from "../layouts/CartLayout.vue";
import {CartTable} from "../components/cart/CartTable.vue";
import {CartTotal} from "../components/cart/CartTotal.vue";

const cartStore = useCartStore()

onMounted(() => {
  cartStore.initializeCart()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Loading State -->
      <div v-if="cartStore.isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="cartStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        {{ cartStore.error }}
      </div>

      <!-- Cart Layout -->
      <CartLayout v-else>
        <!-- Main slot: Cart Table -->
        <template #main>
          <CartTable />
        </template>

        <!-- Sidebar slot: Totals + Shipping -->
        <template #sidebar>
          <CartTotal />
        </template>
      </CartLayout>
    </div>
  </div>
</template>