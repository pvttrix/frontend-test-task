import type {Product} from "./product.ts";

export interface CartItem {
    id: number
    product: Product
    quantity: number
}

export interface CartTotals {
    subtotal: number
    shipping: number
    tax: number
    total: number
}

export interface ShippingInfo {
    city: string
    state: string
    zipCode: string
}