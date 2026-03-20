<script setup>
import BottomNav from '@/components/layout/BottomNav.vue';
import { useThemeStore } from '@/stores/theme';

// Initialize the theme store so dark class is applied on first render
const themeStore = useThemeStore();
</script>

<template>
  <div class="min-h-screen flex justify-center" style="background-color: var(--color-bg);">
    <div
      class="w-full max-w-[480px] min-h-screen relative shadow-lg pb-24"
      style="background-color: var(--color-bg);"
    >
      <router-view />
      <BottomNav />
    </div>
  </div>
</template>
