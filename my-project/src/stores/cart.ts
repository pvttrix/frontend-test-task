// stores/cart.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {CartItem, CartTotals} from "../types/cart.ts";
import {CartService} from "../services/CartService.ts";
import {productsApi} from "../api/productAPI.ts";


export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([])
    const shippingCost = ref(0)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const isEmpty = computed(() => items.value.length === 0)

    const itemCount = computed(() =>
        items.value.reduce((sum, item) => sum + item.quantity, 0)
    )

    const totals = computed((): CartTotals =>
        CartService.calculateTotals(items.value, shippingCost.value)
    )

    const initializeCart = async () => {
        isLoading.value = true
        error.value = null

        try {
            const products = await productsApi.getProductsByCategory('men\'s clothing')
            items.value = products.map((product) => ({
                id: product.id,
                product,
                quantity: 1
            }))
        } catch (e) {
            error.value = 'Failed to load products'
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    const addItem = async () => {
        try {
            const newProduct = await productsApi.createProduct({
                title: 'New Product',
                price: 29
            })

            items.value.push({
                id: Date.now(),
                product: newProduct,
                quantity: 1
            })
        } catch (e) {
            error.value = 'Failed to add product'
            console.error(e)
        }
    }

    const removeItem = (cartItemId: number) => {
        items.value = items.value.filter(item => item.id !== cartItemId)
    }

    const updateQuantity = (cartItemId: number, quantity: number) => {
        if (!CartService.validateQuantity(quantity)) return

        const item = items.value.find(item => item.id === cartItemId)
        if (item) {
            item.quantity = quantity
        }
    }

    const clearCart = () => {
        items.value = []
        shippingCost.value = 0
    }

    const calculateShipping = (zipCode: string) => {
        const baseShipping = 10
        const random = Math.random() * 20
        shippingCost.value = Math.round((baseShipping + random) * 100) / 100
    }

    return {
        items,
        shippingCost,
        isLoading,
        error,
        isEmpty,
        itemCount,
        totals,
        initializeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        calculateShipping
    }
})