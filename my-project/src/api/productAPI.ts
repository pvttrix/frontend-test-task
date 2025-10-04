import type { Product } from '../types/product'
import { apiClient } from './client'

export const productsApi = {
  async getProducts(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/products')
    return response.data
  },

  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`)
    return response.data
  },

  async createProduct(product: Partial<Product>): Promise<Product> {
    const response = await apiClient.post<Product>('/products', product)
    return response.data
  },

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const response = await apiClient.put<Product>(`/products/${id}`, product)
    return response.data
  },

  async deleteProduct(id: number): Promise<void> {
    await apiClient.delete(`/products/${id}`)
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(`/products/category/${category}`)
    return response.data
  }
}
