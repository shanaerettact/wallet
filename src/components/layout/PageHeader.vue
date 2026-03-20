<script setup>
import ThemeToggle from '@/components/ui/ThemeToggle.vue';

defineProps({
  title: {
    type: String,
    default: ''
  },
  showThemeToggle: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b w-full max-w-[480px] mx-auto transition-all duration-300"
    style="
      background-color: color-mix(in srgb, var(--color-surface) 85%, transparent);
      border-color: var(--color-border);
    "
  >
    <div class="flex items-center p-4 justify-between leading-none">
      <!-- Left Slot (e.g. Back Button or Avatar) -->
      <div class="flex w-10 shrink-0 items-center justify-start">
        <slot name="left"></slot>
      </div>

      <!-- Title -->
      <h2
        class="text-lg font-bold leading-tight tracking-tight flex-1 text-center truncate px-2"
        style="color: var(--color-text);"
      >
        {{ title }}
      </h2>

      <!-- Right Slot — falls back to ThemeToggle if showThemeToggle prop is set -->
      <div class="flex w-10 shrink-0 items-center justify-end gap-2">
        <slot name="right"></slot>
        <ThemeToggle v-if="showThemeToggle" />
      </div>
    </div>

    <!-- Bottom Slot (e.g. Tabs) -->
    <div v-if="$slots.bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
