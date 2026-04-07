<script setup>
import { ref, watch, nextTick } from 'vue';
import { showToast } from 'vant';
import { Html5Qrcode } from 'html5-qrcode';
import { textConfig } from '@/constants/textConfig';

const SCANNER_ELEMENT_ID = 'quick-actions-qr-reader';

const showScanPopup = ref(false);
let html5QrCode = null;

const handleAction = (action) => {
  showToast(`${action} clicked`);
};

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
  <div
    class="mb-6 rounded-xl p-4 shadow-sm border"
    style="background-color: var(--color-surface); border-color: var(--color-border);"
  >
    <div class="grid grid-cols-4 gap-2">
      <div
        class="flex flex-col items-center gap-2 cursor-pointer"
        @click="handleAction(textConfig.Home_Action_Deposit)"
      >
        <div
          class="rounded-full p-3 transition-colors"
          style="background-color: var(--color-surface-alt); color: var(--color-primary);"
        >
          <span class="material-symbols-outlined">add_circle</span>
        </div>
        <p class="text-xs font-medium" style="color: var(--color-text);">{{ textConfig.Home_Action_Deposit }}</p>
      </div>

      <div
        class="flex flex-col items-center gap-2 cursor-pointer"
        @click="handleAction(textConfig.Home_Action_Withdraw)"
      >
        <div
          class="rounded-full p-3 transition-colors"
          style="background-color: var(--color-surface-alt); color: var(--color-primary);"
        >
          <span class="material-symbols-outlined">arrow_circle_up</span>
        </div>
        <p class="text-xs font-medium" style="color: var(--color-text);">{{ textConfig.Home_Action_Withdraw }}</p>
      </div>

      <div
        class="flex flex-col items-center gap-2 cursor-pointer"
        @click="openQrScanner"
      >
        <div
          class="rounded-full p-3 transition-colors"
          style="background-color: var(--color-surface-alt); color: var(--color-primary);"
        >
          <span class="material-symbols-outlined">qr_code_scanner</span>
        </div>
        <p class="text-xs font-medium" style="color: var(--color-text);">{{ textConfig.Home_Action_Scan }}</p>
      </div>

      <div
        class="flex flex-col items-center gap-2 cursor-pointer"
        @click="handleAction(textConfig.Home_Action_Pay)"
      >
        <div
          class="rounded-full p-3 transition-colors"
          style="background-color: var(--color-surface-alt); color: var(--color-primary);"
        >
          <span class="material-symbols-outlined">payments</span>
        </div>
        <p class="text-xs font-medium" style="color: var(--color-text);">{{ textConfig.Home_Action_Pay }}</p>
      </div>
    </div>
  </div>

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
</template>
