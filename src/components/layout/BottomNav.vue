<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showToast } from 'vant';
import { Html5Qrcode } from 'html5-qrcode';
import { textConfig } from '@/constants/textConfig';

const SCANNER_ELEMENT_ID = 'bottom-nav-qr-reader';

const route = useRoute();
const router = useRouter();
const active = ref(0);
const showScanPopup = ref(false);
let html5QrCode = null;

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

async function cleanupScanner() {
  if (!html5QrCode) return;
  try {
    if (html5QrCode.isScanning) {
      await html5QrCode.stop();
    }
  } catch {
    /* ignore */
  }
  try {
    html5QrCode.clear();
  } catch {
    /* ignore */
  }
  html5QrCode = null;
}

watch(showScanPopup, async (open) => {
  if (!open) {
    await cleanupScanner();
  }
});

const openQrScanner = () => {
  showScanPopup.value = true;
};

const closeQrScanner = () => {
  showScanPopup.value = false;
};

async function onScanPopupOpened() {
  await nextTick();
  await cleanupScanner();
  try {
    html5QrCode = new Html5Qrcode(SCANNER_ELEMENT_ID);
    await html5QrCode.start(
      { facingMode: 'environment' },
      {
        fps: 10,
        qrbox: (w, h) => {
          const edge = Math.min(w, h);
          const size = Math.floor(edge * 0.65);
          return { width: size, height: size };
        },
      },
      (decodedText) => {
        showToast({
          message: `${textConfig.Home_Scan_Result}: ${decodedText}`,
          duration: 3000,
        });
        closeQrScanner();
      },
      () => {}
    );
  } catch (err) {
    console.error(err);
    showToast(textConfig.Home_Scan_Camera_Error);
    showScanPopup.value = false;
  }
}
</script>

<template>
  <div class="bottom-nav-wrapper">
    <!-- Floating Action Button for Scan -->
    <button
      @click="openQrScanner"
      :class="[
        'fab-button',
        { 'fab-active': showScanPopup }
      ]"
      aria-label="Scan QR Code"
    >
      <span class="material-symbols-outlined fab-icon">
        qr_code_scanner
      </span>
      <div class="fab-glow"></div>
      <div class="fab-scan-lines"></div>
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

    <!-- QR Scanner Popup -->
    <van-popup
      v-model:show="showScanPopup"
      position="bottom"
      round
      :style="{ height: '78%' }"
      :close-on-click-overlay="true"
      @opened="onScanPopupOpened"
    >
      <div class="flex flex-col h-full min-h-0 p-4 box-border" style="background-color: var(--color-surface);">
        <div class="flex justify-between items-center shrink-0 mb-3">
          <span class="text-base font-medium" style="color: var(--color-text);">{{ textConfig.Home_Scan_Title }}</span>
          <span
            class="material-symbols-outlined cursor-pointer p-1"
            style="color: var(--color-text-muted);"
            @click="closeQrScanner"
          >close</span>
        </div>
        <div
          :id="SCANNER_ELEMENT_ID"
          class="flex-1 min-h-[220px] w-full rounded-lg overflow-hidden"
          style="background-color: var(--color-bg);"
        />
      </div>
    </van-popup>
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
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%);
  color: white;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 10px 30px rgba(37, 99, 235, 0.4),
    0 6px 16px rgba(37, 99, 235, 0.3),
    0 2px 8px rgba(37, 99, 235, 0.2),
    0 0 0 5px rgba(255, 255, 255, 0.12),
    inset 0 1px 2px rgba(255, 255, 255, 0.3);
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  outline: none;
  overflow: hidden;
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
  transform: translateX(-50%) translateY(-5px) scale(1.08);
  box-shadow: 
    0 14px 40px rgba(37, 99, 235, 0.5),
    0 8px 20px rgba(37, 99, 235, 0.4),
    0 4px 10px rgba(37, 99, 235, 0.3),
    0 0 0 6px rgba(255, 255, 255, 0.18),
    inset 0 1px 3px rgba(255, 255, 255, 0.4);
}

.fab-button:active {
  transform: translateX(-50%) translateY(-1px) scale(0.96);
  box-shadow: 
    0 6px 20px rgba(37, 99, 235, 0.35),
    0 3px 10px rgba(37, 99, 235, 0.25),
    0 0 0 4px rgba(255, 255, 255, 0.1),
    inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.fab-active {
  background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #7dd3fc 100%);
  box-shadow: 
    0 12px 36px rgba(14, 165, 233, 0.5),
    0 6px 18px rgba(14, 165, 233, 0.4),
    0 2px 8px rgba(14, 165, 233, 0.3),
    0 0 0 6px rgba(56, 189, 248, 0.25),
    inset 0 1px 2px rgba(255, 255, 255, 0.35);
  animation: scan-pulse 2s ease-in-out infinite;
}

.fab-active:hover {
  box-shadow: 
    0 16px 45px rgba(14, 165, 233, 0.6),
    0 8px 24px rgba(14, 165, 233, 0.5),
    0 4px 12px rgba(14, 165, 233, 0.4),
    0 0 0 8px rgba(56, 189, 248, 0.3),
    inset 0 1px 3px rgba(255, 255, 255, 0.4);
}

/* FAB Icon */
.fab-icon {
  font-size: 36px;
  position: relative;
  z-index: 3;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25));
  font-weight: 400;
}

/* Animated glow effect */
.fab-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%);
  opacity: 0;
  animation: pulse 2.5s ease-in-out infinite;
  z-index: 1;
}

.fab-active .fab-glow {
  animation: pulse-active 2s ease-in-out infinite;
}

/* Scan line animation effect */
.fab-scan-lines {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 45%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 55%,
    transparent 100%
  );
  opacity: 0;
  z-index: 2;
}

.fab-active .fab-scan-lines {
  opacity: 1;
  animation: scan-line 1.5s linear infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.15);
  }
}

@keyframes pulse-active {
  0%, 100% {
    opacity: 0;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

@keyframes scan-line {
  0% {
    transform: translateY(-100%) rotate(0deg);
  }
  100% {
    transform: translateY(100%) rotate(0deg);
  }
}

@keyframes scan-pulse {
  0%, 100% {
    box-shadow: 
      0 12px 36px rgba(14, 165, 233, 0.5),
      0 6px 18px rgba(14, 165, 233, 0.4),
      0 2px 8px rgba(14, 165, 233, 0.3),
      0 0 0 6px rgba(56, 189, 248, 0.25),
      inset 0 1px 2px rgba(255, 255, 255, 0.35);
  }
  50% {
    box-shadow: 
      0 14px 42px rgba(14, 165, 233, 0.6),
      0 8px 22px rgba(14, 165, 233, 0.5),
      0 4px 12px rgba(14, 165, 233, 0.4),
      0 0 0 8px rgba(56, 189, 248, 0.35),
      inset 0 1px 2px rgba(255, 255, 255, 0.4);
  }
}

/* Dark mode adjustments */
:root.dark .fab-button {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%);
  box-shadow: 
    0 10px 30px rgba(59, 130, 246, 0.45),
    0 6px 16px rgba(59, 130, 246, 0.35),
    0 2px 8px rgba(59, 130, 246, 0.25),
    0 0 0 5px rgba(255, 255, 255, 0.08),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);
}

:root.dark .fab-button:hover {
  box-shadow: 
    0 14px 40px rgba(59, 130, 246, 0.55),
    0 8px 20px rgba(59, 130, 246, 0.45),
    0 4px 10px rgba(59, 130, 246, 0.35),
    0 0 0 6px rgba(255, 255, 255, 0.12),
    inset 0 1px 3px rgba(255, 255, 255, 0.25);
}

:root.dark .fab-active {
  background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%);
  box-shadow: 
    0 12px 36px rgba(14, 165, 233, 0.55),
    0 6px 18px rgba(14, 165, 233, 0.45),
    0 2px 8px rgba(14, 165, 233, 0.35),
    0 0 0 6px rgba(56, 189, 248, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.3);
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
