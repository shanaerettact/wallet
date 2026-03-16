<script setup>
import BottomNav from '@/components/layout/BottomNav.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center">
    <div class="w-full max-w-[480px] bg-[#EFEFF5] dark:bg-gray-950 min-h-screen relative shadow-lg pb-24">
        <router-view />
        <BottomNav />
    </div>
  </div>
</template>

<style scoped>
/* Ensure no side weirdness */
</style>
