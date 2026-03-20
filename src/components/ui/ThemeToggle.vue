<script setup>
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
</script>

<template>
  <button
    class="theme-toggle"
    :aria-label="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="themeStore.toggle()"
  >
    <Transition name="icon-swap" mode="out-in">
      <!-- Sun icon — shown in dark mode to switch to light -->
      <span
        v-if="themeStore.isDark"
        key="sun"
        class="material-symbols-outlined text-[20px] leading-none"
        style="font-variation-settings: 'FILL' 1;"
      >
        light_mode
      </span>
      <!-- Moon icon — shown in light mode to switch to dark -->
      <span
        v-else
        key="moon"
        class="material-symbols-outlined text-[20px] leading-none"
        style="font-variation-settings: 'FILL' 1;"
      >
        dark_mode
      </span>
    </Transition>
  </button>
</template>

<style scoped>
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.icon-swap-enter-from {
  opacity: 0;
  transform: rotate(-30deg) scale(0.8);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.8);
}
</style>
