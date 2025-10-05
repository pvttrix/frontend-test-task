<script setup lang="ts">
import { useCartStore } from '../../../stores/cart.ts';
import { computed } from 'vue';
import UiButton from '../ui/UiButton.vue';
import { formatPrice } from '../../../utils/formatter.ts';

const cartStore = useCartStore();

const subtotalLabel = computed(() => `Subtotal: ${formatPrice(cartStore.totals.subtotal)}`);

const shippingLabel = computed(() =>
  cartStore.totals.shipping > 0 ? `Shipping: ${formatPrice(cartStore.totals.shipping)}` : 'Shipping: Not calculated',
);

const taxLabel = computed(() => `Tax at 20%: ${formatPrice(cartStore.totals.tax)}`);

const totalLabel = computed(() => `Total: ${formatPrice(cartStore.totals.total)}`);

const handleCheckout = () => {
  if (cartStore.isEmpty) return;

  // TODO: Implement checkout logic
  alert('Proceeding to checkout...');
};
</script>

<template>
  <h2
    id="cart-totals-heading"
    class="text-md font-bold text-navy-blue mb-6 mt-2">
    Cart Totals
  </h2>
  <aside
    class="bg-magnolia rounded-lg shadow p-6 font-lato"
    role="region"
    aria-labelledby="cart-totals-heading">
    <dl class="space-y-4">
      <div class="flex justify-between items-center">
        <dt class="text-base text-navy-blue">Subtotals:</dt>
        <dd
          class="text-base font-light text-navy-blue"
          :aria-label="subtotalLabel">
          {{ formatPrice(cartStore.totals.subtotal) }}
        </dd>
      </div>

      <div
        class="border-t border-bright-gray pt-4"
        role="separator"
        aria-hidden="true">
        <div class="flex justify-between items-center">
          <dt class="text-base text-navy-blue">Shipping</dt>
          <dd
            class="text-base font-light text-navy-blue"
            :aria-label="shippingLabel">
            <span v-if="cartStore.totals.shipping > 0">
              {{ formatPrice(cartStore.totals.shipping) }}
            </span>
            <span
              v-else
              class="text-navy-blue font-light">
              —
            </span>
          </dd>
        </div>
      </div>

      <div
        class="border-t border-bright-gray pt-4"
        role="separator"
        aria-hidden="true">
        <div class="flex justify-between items-center">
          <dt class="text-base text-navy-blue">Tax (20%)</dt>
          <dd
            class="text-base font-light text-navy-blue"
            :aria-label="taxLabel">
            {{ formatPrice(cartStore.totals.tax) }}
          </dd>
        </div>
      </div>

      <div
        class="border-t border-bright-gray pt-4"
        role="separator"
        aria-hidden="true">
        <div class="flex justify-between items-center">
          <dt class="text-lg text-navy-blue">Totals:</dt>
          <dd
            class="text-base font-light text-navy-blue"
            :aria-label="totalLabel">
            {{ formatPrice(cartStore.totals.total) }}
          </dd>
        </div>
      </div>
    </dl>

    <div
      class="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true">
      Cart total is {{ formatPrice(cartStore.totals.total) }}
    </div>

    <UiButton
      variant="success"
      block
      size="lg"
      class="mt-6"
      :disabled="cartStore.isEmpty"
      :aria-label="`Proceed to checkout with total of ${formatPrice(cartStore.totals.total)}`"
      @click="handleCheckout">
      Proceed To Checkout
    </UiButton>
  </aside>
</template>
