<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { textConfig } from '@/constants/textConfig';

const route = useRoute();
const active = ref(0);

const updateActive = (path) => {
  if (path.startsWith('/task')) {
    active.value = 2;
  } else if (path.startsWith('/market')) {
    active.value = 1;
  } else if (path.startsWith('/wallet')) {
    active.value = 3;
  } else if (path.startsWith('/my')) {
    active.value = 4;
  } else {
    if (path === '/' || path === '') {
      active.value = 0;
    }
  }
};

watch(() => route.path, (newPath) => {
  updateActive(newPath);
});

onMounted(() => {
  updateActive(route.path);
});
</script>

<template>
  <van-tabbar
    v-model="active"
    class="!fixed !bottom-0 !border-t pb-safe w-full max-w-[480px] left-0 right-0 mx-auto"
  >
    <van-tabbar-item to="/">
      <template #icon>
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
      </template>
      <span class="text-[10px] font-bold">{{ textConfig.BottomNav_Home }}</span>
    </van-tabbar-item>
    <van-tabbar-item to="/market">
      <template #icon>
        <span class="material-symbols-outlined">candlestick_chart</span>
      </template>
      <span class="text-[10px]">{{ textConfig.BottomNav_Market }}</span>
    </van-tabbar-item>
    <van-tabbar-item to="/task">
      <template #icon>
        <span class="material-symbols-outlined">trophy</span>
      </template>
      <span class="text-[10px]">{{ textConfig.BottomNav_Task }}</span>
    </van-tabbar-item>
    <van-tabbar-item to="/wallet">
      <template #icon>
        <span class="material-symbols-outlined">account_balance_wallet</span>
      </template>
      <span class="text-[10px]">{{ textConfig.BottomNav_Wallet }}</span>
    </van-tabbar-item>
    <van-tabbar-item to="/my">
      <template #icon>
        <span class="material-symbols-outlined">settings</span>
      </template>
      <span class="text-[10px]">{{ textConfig.BottomNav_My }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
:deep(.van-tabbar-item--active) {
  color: var(--color-primary) !important;
}
:deep(.van-tabbar) {
  background-color: var(--color-surface) !important;
  border-color: var(--color-border) !important;
}
</style>
