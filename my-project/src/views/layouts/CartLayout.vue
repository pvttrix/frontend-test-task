<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
    <div class="lg:col-span-2">
      <slot name="main" />
    </div>

    <div class="lg:col-span-1 space-y-6">
      <slot name="sidebar" />
    </div>
  </div>
</template>
