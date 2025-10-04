<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../../../stores/cart.ts';
import UiButton from '../ui/UiButton.vue';
import { formatPrice } from '../../../utils/formatter.ts';
import { shippingFormSchema } from '../../../utils/schemas/shipping.ts';
import { ZodError } from 'zod';
import type { ShippingInfo } from '../../../models/internal/cart.ts';

const cartStore = useCartStore();

const shippingInfo = ref<ShippingInfo>({
  city: '',
  state: '',
  zipCode: '',
});

const errors = ref({
  city: '',
  state: '',
  zipCode: '',
});

const isCalculating = ref(false);
const shippingMessage = ref('');

const handleCalculateShipping = async () => {
  errors.value.city = '';
  errors.value.state = '';
  errors.value.zipCode = '';

  try {
    shippingFormSchema.parse({
      city: shippingInfo.value.city,
      state: shippingInfo.value.state,
      zipCode: shippingInfo.value.zipCode,
    });

    isCalculating.value = true;
    shippingMessage.value = '';

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      cartStore.calculateShipping();
      shippingMessage.value = `Shipping calculated: ${formatPrice(cartStore.totals.shipping)}`;
    } catch {
      shippingMessage.value = 'Failed to calculate shipping';
    } finally {
      isCalculating.value = false;
    }
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach(issue => {
        const field = issue.path[0] as keyof typeof errors.value;
        if (field in errors.value) {
          errors.value[field] = issue.message;
        }
      });
    }
  }
};
</script>

<template>
  <section aria-labelledby="shipping-calculator-heading">
    <h2
      id="shipping-calculator-heading"
      class="text-md font-bold text-navy-blue mb-6">
      Calculate Shopping
    </h2>

    <form
      class="bg-magnolia rounded-lg shadow p-6 space-y-6"
      aria-label="Shipping calculator form"
      novalidate
      @submit.prevent="handleCalculateShipping">
      <div>
        <label
          for="shipping-city"
          class="visually-hidden">
          City
        </label>
        <div class="relative">
          <input
            id="shipping-city"
            v-model.trim="shippingInfo.city"
            type="text"
            placeholder="Stuttgart"
            :aria-invalid="!!errors.city"
            :aria-describedby="errors.city ? 'city-error' : undefined"
            class="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-light-blue text-navy-blue placeholder:text-input-placeholder focus:outline-none focus:border-navy-blue transition-colors" />
        </div>
        <p
          v-if="errors.city"
          id="city-error"
          class="mt-1 text-sm text-red-600"
          role="alert">
          {{ errors.city }}
        </p>
      </div>

      <div>
        <label
          for="shipping-state"
          class="visually-hidden">
          State or Region
        </label>
        <div class="relative">
          <input
            id="shipping-state"
            v-model.trim="shippingInfo.state"
            type="text"
            placeholder="Mirpur Dhaka - 1200"
            :aria-invalid="!!errors.state"
            :aria-describedby="errors.state ? 'state-error' : undefined"
            class="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-light-blue text-navy-blue placeholder:text-input-placeholder focus:outline-none focus:border-navy-blue transition-colors" />
        </div>
        <p
          v-if="errors.state"
          id="state-error"
          class="mt-1 text-sm text-red-600"
          role="alert">
          {{ errors.state }}
        </p>
      </div>

      <div>
        <label
          for="shipping-zipcode"
          class="visually-hidden">
          Zip Code
        </label>
        <div class="relative">
          <input
            id="shipping-zipcode"
            v-model.trim="shippingInfo.zipCode"
            type="text"
            placeholder="12345"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="5"
            :aria-invalid="!!errors.zipCode"
            :aria-describedby="errors.zipCode ? 'zipcode-error' : 'zipcode-hint'"
            class="w-full px-0 py-3 bg-transparent font-lato border-0 border-b-2 border-light-blue text-navy-blue placeholder:text-input-placeholder focus:outline-none focus:border-navy-blue transition-colors" />
        </div>
        <p
          id="zipcode-hint"
          class="visually-hidden">
          Enter 5-digit postal code
        </p>
        <p
          v-if="errors.zipCode"
          id="zipcode-error"
          class="mt-1 text-sm text-red-600"
          role="alert">
          {{ errors.zipCode }}
        </p>
      </div>

      <div
        v-if="shippingMessage"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        class="p-3 rounded text-sm"
        :class="shippingMessage.includes('Failed') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-success'">
        {{ shippingMessage }}
      </div>

      <UiButton
        type="submit"
        variant="danger"
        block
        size="lg"
        :loading="isCalculating"
        :disabled="isCalculating"
        aria-label="Calculate shipping cost">
        {{ isCalculating ? 'Calculating...' : 'Calculate Shiping' }}
      </UiButton>
    </form>
  </section>
</template>
