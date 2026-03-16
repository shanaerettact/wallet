<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50 bg-[rgb(255_255_255_/_0.8)] dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 w-full max-w-[480px] mx-auto transition-all duration-300">
    <div class="flex items-center p-4 justify-between leading-none">
      <!-- Left Slot (e.g. Back Button or Avatar) -->
      <div class="flex w-10 shrink-0 items-center justify-start">
        <slot name="left"></slot>
      </div>
      
      <!-- Title -->
      <h2 class="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-[#101018] dark:text-white truncate px-2">
        {{ title }}
      </h2>
      
      <!-- Right Slot (e.g. Notification) -->
      <div class="flex w-10 shrink-0 items-center justify-end">
        <slot name="right"></slot>
      </div>
    </div>
    
    <!-- Bottom Slot (e.g. Tabs) -->
    <div v-if="$slots.bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
