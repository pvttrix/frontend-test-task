<script setup lang="ts">
import {useCartStore} from "./stores/cart.ts";
import {onMounted} from "vue";

import CartPage from "./views/pages/CartPage.vue";
const cartStore = useCartStore()

onMounted(async () => {
  await cartStore.initializeCart()
})
</script>

<template>

<CartPage />
</template>

