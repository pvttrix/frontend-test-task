<script setup lang="ts">
import {useCartStore} from "../../../stores/cart.ts";
import CartItem from './CartItem.vue'
import CartTableActions from "./CartTableActions.vue";
import CartEmpty from "./CartEmpty.vue";


const cartStore = useCartStore()

const handleRemove = (itemId: number) => {
  cartStore.removeItem(itemId)
}

const handleUpdateQuantity = (itemId: number, quantity: number) => {
  cartStore.updateQuantity(itemId, quantity)
}
</script>

<template>
  <div v-if="!cartStore.isEmpty">
    <!-- Desktop: Table -->
    <div class="hidden md:block bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full" role="table" aria-label="Shopping cart items">
        <caption class="sr-only">
          Shopping cart with {{ cartStore.itemCount }} items
        </caption>

        <thead>
        <tr>
          <th scope="col" class="text-navy-blue text-left pr-32 pb-4 px-6 pt-4 bg-gray-50">
            Product
          </th>
          <th scope="col" class="text-navy-blue text-left pr-32 pb-4 bg-gray-50">
            Price
          </th>
          <th scope="col" class="text-navy-blue text-left pr-32 pb-4 bg-gray-50">
            Quantity
          </th>
          <th scope="col" class="text-navy-blue text-left pb-4 bg-gray-50">
            Total
          </th>
          <th scope="col" class="pb-4 bg-gray-50">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
        </thead>

        <tbody>
        <CartItem
            v-for="item in cartStore.items"
            :key="item.id"
            :item="item"
            @remove="handleRemove"
            @update:quantity="handleUpdateQuantity"
        />
        </tbody>
      </table>
    </div>

    <!-- Mobile: Cards -->
    <div class="md:hidden space-y-4">
      <CartItem
          v-for="item in cartStore.items"
          :key="item.id"
          :item="item"
          @remove="handleRemove"
          @update:quantity="handleUpdateQuantity"
      />
    </div>

    <!-- Actions -->
    <CartTableActions class="mt-6" />
  </div>
  <CartEmpty v-else @add-item="cartStore.addItem" />
</template>