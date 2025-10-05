<script setup lang="ts">
import { useCartStore } from '../../../stores/cart.ts';
import CartItem from './CartItem.vue';
import CartTableActions from './CartTableActions.vue';
import CartEmpty from './CartEmpty.vue';

const cartStore = useCartStore();

const handleRemove = (itemId: number) => {
  cartStore.removeItem(itemId);
};

const handleUpdateQuantity = (itemId: number, quantity: number) => {
  cartStore.updateQuantity(itemId, quantity);
};
</script>

<template>
  <div v-if="!cartStore.isEmpty">
    <!-- Desktop: Table -->
    <div class="hidden md:block bg-white rounded-lg">
      <table
        class="w-full"
        role="table"
        aria-label="Shopping cart items">
        <caption class="visually-hidden">Shopping cart with {{ cartStore.itemCount }} items</caption>

        <thead>
          <tr>
            <th
              scope="col"
              class="text-navy-blue text-left xl:pr-32 lg:pr-16 md:pr-20 pb-4 px-6 pt-4">
              Product
            </th>
            <th
              scope="col"
              class="text-navy-blue text-left xl:pr-32 lg:pr-16 md:pr-20 pb-4">
              Price
            </th>
            <th
              scope="col"
              class="text-navy-blue text-left xl:pr-32 lg:pr-16 md:pr-20 pb-4">
              Quantity
            </th>
            <th
              scope="col"
              class="text-navy-blue text-left lg:pr-16 md:pr-20 pb-4">
              Total
            </th>
            <th
              scope="col"
              class="pb-4">
              <span class="visually-hidden">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <CartItem
            v-for="item in cartStore.items"
            :key="item.product.id"
            :item="item"
            @remove="handleRemove"
            @update:quantity="handleUpdateQuantity" />
        </tbody>
      </table>
    </div>

    <!-- Mobile: Cards -->
    <div class="md:hidden space-y-4">
      <CartItem
        v-for="item in cartStore.items"
        :key="item.product.id"
        :item="item"
        @remove="handleRemove"
        @update:quantity="handleUpdateQuantity" />
    </div>

    <CartTableActions class="mt-6" />
  </div>
  <CartEmpty
    v-else
    @add-item="cartStore.addItem" />
</template>
