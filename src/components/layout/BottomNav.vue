<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { textConfig } from '@/constants/textConfig';

const route = useRoute();
const router = useRouter();
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

const navigateToTask = () => {
  router.push('/task');
};
</script>

<template>
  <div class="bottom-nav-wrapper">
    <!-- Floating Action Button for Task -->
    <button
      @click="navigateToTask"
      :class="[
        'fab-button',
        { 'fab-active': active === 2 }
      ]"
      aria-label="Tasks"
    >
      <span class="material-symbols-outlined fab-icon" style="font-variation-settings: 'FILL' 1;">
        trophy
      </span>
      <div class="fab-glow"></div>
    </button>

    <!-- Bottom Navigation Bar -->
    <van-tabbar
      v-model="active"
      class="!fixed !bottom-0 !border-t pb-safe w-full max-w-[480px] left-0 right-0 mx-auto nav-with-fab"
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
      <!-- Spacer for FAB -->
      <div class="fab-spacer"></div>
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
  </div>
</template>

<style scoped>
.bottom-nav-wrapper {
  position: relative;
}

/* Floating Action Button */
.fab-button {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: white;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 8px 24px rgba(37, 99, 235, 0.35),
    0 4px 12px rgba(37, 99, 235, 0.25),
    0 0 0 4px rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  max-width: calc(480px - 32px);
  position: fixed;
}

.fab-button::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.fab-button:hover::before {
  opacity: 1;
}

.fab-button:hover {
  transform: translateX(-50%) translateY(-4px) scale(1.05);
  box-shadow: 
    0 12px 32px rgba(37, 99, 235, 0.45),
    0 6px 16px rgba(37, 99, 235, 0.35),
    0 0 0 6px rgba(255, 255, 255, 0.15);
}

.fab-button:active {
  transform: translateX(-50%) translateY(-1px) scale(0.98);
  box-shadow: 
    0 4px 16px rgba(37, 99, 235, 0.3),
    0 2px 8px rgba(37, 99, 235, 0.2),
    0 0 0 3px rgba(255, 255, 255, 0.1);
}

.fab-active {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%);
  box-shadow: 
    0 12px 32px rgba(56, 189, 248, 0.45),
    0 6px 16px rgba(56, 189, 248, 0.35),
    0 0 0 6px rgba(56, 189, 248, 0.2);
}

.fab-active:hover {
  box-shadow: 
    0 16px 40px rgba(56, 189, 248, 0.5),
    0 8px 20px rgba(56, 189, 248, 0.4),
    0 0 0 8px rgba(56, 189, 248, 0.25);
}

/* FAB Icon */
.fab-icon {
  font-size: 32px;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Animated glow effect */
.fab-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
  opacity: 0;
  animation: pulse 2s ease-in-out infinite;
}

.fab-active .fab-glow {
  animation: pulse-active 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }
}

@keyframes pulse-active {
  0%, 100% {
    opacity: 0;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.15);
  }
}

/* Dark mode adjustments */
:root.dark .fab-button {
  box-shadow: 
    0 8px 24px rgba(96, 165, 250, 0.4),
    0 4px 12px rgba(96, 165, 250, 0.3),
    0 0 0 4px rgba(255, 255, 255, 0.05);
}

:root.dark .fab-button:hover {
  box-shadow: 
    0 12px 32px rgba(96, 165, 250, 0.5),
    0 6px 16px rgba(96, 165, 250, 0.4),
    0 0 0 6px rgba(255, 255, 255, 0.1);
}

:root.dark .fab-active {
  box-shadow: 
    0 12px 32px rgba(56, 189, 248, 0.5),
    0 6px 16px rgba(56, 189, 248, 0.4),
    0 0 0 6px rgba(56, 189, 248, 0.25);
}

/* Bottom Navigation with FAB */
.nav-with-fab {
  display: flex;
  align-items: center;
}

.fab-spacer {
  flex: 1;
  min-width: 80px;
}

:deep(.van-tabbar) {
  background-color: var(--color-surface) !important;
  border-color: var(--color-border) !important;
}

/* Ensure proper mobile centering */
@media (max-width: 480px) {
  .fab-button {
    left: 50%;
  }
}

@media (min-width: 481px) {
  .fab-button {
    left: 50%;
    max-width: 480px;
  }
}
</style>
