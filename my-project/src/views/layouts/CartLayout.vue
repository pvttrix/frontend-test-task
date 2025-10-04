<script setup lang="ts">

</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
    <!-- Left: Cart Content (2/3 на desktop) -->
    <div class="lg:col-span-2">
      <slot name="main" />
    </div>

    <!-- Right: Sidebar (1/3 на desktop) -->
    <div class="lg:col-span-1 space-y-6">
      <slot name="sidebar" />
    </div>
  </div>
</template>