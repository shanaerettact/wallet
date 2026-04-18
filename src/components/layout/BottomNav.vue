<script setup>
import { ref, watch, onMounted, nextTick, computed } from 'vue';
import { useRoute } from 'vue-router';
import { showToast, showConfirmDialog, showSuccessToast } from 'vant';
import { Html5Qrcode } from 'html5-qrcode';
import { textConfig } from '@/constants/textConfig';

const SCANNER_ELEMENT_ID = 'bottom-nav-qr-reader';
const PAY_MIN = 0.01;
const PAY_MAX = 999_999_999.99;

// Shift+click FAB: skip camera, treat as scanned MOCK_SCAN_PAYEE (remove when shipping)
const MOCK_SCAN_PAYEE = 'mpay:recv:U-DEMO-001';
// Temp: payload in QR until backend provides real user id
const MY_RECEIVE_QR_PAYLOAD = 'mpay:user:self-U-TEMP-001';

const route = useRoute();
const active = ref(0);
const showScanPopup = ref(false);
const showAmountPopup = ref(false);
const showMyQrPopup = ref(false);
const scannedPayeeRaw = ref('');
const payAmount = ref('');
const scanHandled = ref(false);
const scanCameraStarting = ref(false);
let html5QrCode = null;

function waitNextAnimationFrames(count = 2) {
  return new Promise((resolve) => {
    const step = (n) => {
      if (n <= 0) resolve();
      else requestAnimationFrame(() => step(n - 1));
    };
    step(count);
  });
}

function buildQrboxFunction() {
  return (w, h) => {
    const vw = Number(w) || 0;
    const vh = Number(h) || 0;
    const edge = Math.max(1, Math.min(vw, vh));
    const size = Math.max(120, Math.floor(edge * 0.65));
    return { width: size, height: size };
  };
}

/* getUserMedia must run during the tap; iOS / many WebViews reject delayed camera access. */
const GUM_PRIMER_CONSTRAINTS = [
  { video: { facingMode: { ideal: 'environment' } } },
  { video: { facingMode: 'environment' } },
  { video: { facingMode: { ideal: 'user' } } },
  { video: { facingMode: 'user' } },
  { video: true },
];

async function primeCameraFromUserGesture() {
  const md = navigator.mediaDevices;
  if (!md?.getUserMedia) return false;
  for (const c of GUM_PRIMER_CONSTRAINTS) {
    try {
      const stream = await md.getUserMedia(c);
      stream.getTracks().forEach((t) => t.stop());
      return true;
    } catch {
      /* try next */
    }
  }
  return false;
}

async function tryStartScannerWithConfig(cameraConfig) {
  const qrbox = buildQrboxFunction();
  await html5QrCode.start(
    cameraConfig,
    {
      fps: 10,
      qrbox,
    },
    (decodedText) => {
      if (scanHandled.value) return;
      const text = decodedText?.trim() ?? '';
      if (!text) {
        showToast(textConfig.Home_Scan_Qr_Empty);
        return;
      }
      afterQrDecoded(text);
    },
    () => {}
  );
}

const myQrImageUrl = computed(() => {
  const q = encodeURIComponent(MY_RECEIVE_QR_PAYLOAD);
  return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&color=0f172a&bgcolor=ffffff&data=${q}`;
});

const updateActive = (path) => {
  if (path.startsWith('/market')) {
    active.value = 1;
  } else if (path.startsWith('/wallet')) {
    active.value = 2;
  } else if (path.startsWith('/my')) {
    active.value = 3;
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

watch(showAmountPopup, (open) => {
  if (!open) {
    payAmount.value = '';
    scannedPayeeRaw.value = '';
    scanHandled.value = false;
    showMyQrPopup.value = false;
  }
});

function formatPayeePreview(raw) {
  const s = String(raw ?? '').trim();
  if (!s) return '—';
  const max = 40;
  if (s.length <= max) return s;
  return `${s.slice(0, 18)}…${s.slice(-14)}`;
}

function onPayAmountUpdate(val) {
  let v = String(val ?? '').replace(/[^\d.]/g, '');
  const dot = v.indexOf('.');
  if (dot !== -1) {
    v = `${v.slice(0, dot + 1)}${v.slice(dot + 1).replace(/\./g, '')}`;
  }
  const [intPart = '', decPart = ''] = v.split('.');
  payAmount.value = decPart.length ? `${intPart}.${decPart.slice(0, 2)}` : intPart;
}

function validatePayAmount() {
  const s = payAmount.value.trim();
  if (!s) return textConfig.Home_Scan_Amount_Empty;
  if (s.endsWith('.')) return textConfig.Home_Scan_Amount_Invalid;
  const num = Number(s);
  if (!Number.isFinite(num)) return textConfig.Home_Scan_Amount_Invalid;
  const dec = s.includes('.') ? s.split('.')[1] ?? '' : '';
  if (dec.length > 2) return textConfig.Home_Scan_Amount_Decimals;
  if (num < PAY_MIN) return textConfig.Home_Scan_Amount_Min;
  if (num > PAY_MAX) return textConfig.Home_Scan_Amount_Max;
  return null;
}

function closeAmountPopup() {
  showAmountPopup.value = false;
}

function openMyQrPopup() {
  showMyQrPopup.value = true;
}

function closeMyQrPopup() {
  showMyQrPopup.value = false;
}

async function submitScannedPay() {
  const err = validatePayAmount();
  if (err) {
    showToast(err);
    return;
  }
  const num = Number(payAmount.value);
  const amountLabel = num.toLocaleString('zh-TW', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  try {
    await showConfirmDialog({
      title: textConfig.Home_Scan_Pay_Confirm_Title,
      message: `${textConfig.Home_Scan_Pay_Confirm_Amount}${amountLabel} USDT\n${textConfig.Home_Scan_Pay_Confirm_Payee}${formatPayeePreview(scannedPayeeRaw.value)}\n\n${textConfig.Home_Scan_Pay_Confirm_Question}`,
      confirmButtonText: textConfig.Home_Scan_Btn_Confirm,
      cancelButtonText: textConfig.Common_Cancel,
    });
  } catch {
    return;
  }
  showSuccessToast(textConfig.Home_Scan_Pay_Success);
  closeAmountPopup();
}

const openQrScanner = () => {
  showAmountPopup.value = false;
  scanHandled.value = false;
  showScanPopup.value = true;
};

const closeQrScanner = () => {
  showScanPopup.value = false;
};

function afterQrDecoded(text) {
  scanHandled.value = true;
  scannedPayeeRaw.value = text;
  payAmount.value = '';
  closeQrScanner();
  showAmountPopup.value = true;
}

function openMockScannedPayFlow() {
  afterQrDecoded(MOCK_SCAN_PAYEE);
}

async function onFabClick(e) {
  if (e.shiftKey) {
    e.preventDefault();
    openMockScannedPayFlow();
    return;
  }
  if (typeof window !== 'undefined' && window.isSecureContext === false) {
    showToast(textConfig.Home_Scan_Camera_Requires_Https);
    return;
  }
  const ok = await primeCameraFromUserGesture();
  if (!ok) {
    showToast(textConfig.Home_Scan_Camera_Error);
    return;
  }
  openQrScanner();
}

async function onScanPopupOpen() {
  if (scanCameraStarting.value) return;
  if (!navigator.mediaDevices?.getUserMedia) {
    showToast(textConfig.Home_Scan_Camera_Error);
    showScanPopup.value = false;
    return;
  }
  scanCameraStarting.value = true;
  let lastErr = null;
  try {
    await nextTick();
    await waitNextAnimationFrames(2);
    await cleanupScanner();
    const host = document.getElementById(SCANNER_ELEMENT_ID);
    if (!host?.isConnected) {
      showToast(textConfig.Home_Scan_Camera_Error);
      showScanPopup.value = false;
      return;
    }
    const cameraAttempts = [];
    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices?.length) {
        const back = devices.find((d) => /back|rear|environment|wide/i.test(d.label));
        const chosen = back ?? devices[0];
        if (chosen?.id) {
          cameraAttempts.push(chosen.id);
        }
      }
    } catch {
      /* ignore */
    }
    cameraAttempts.push(
      { facingMode: 'environment' },
      { facingMode: { exact: 'environment' } },
      { facingMode: 'user' }
    );
    for (const cfg of cameraAttempts) {
      try {
        html5QrCode = new Html5Qrcode(SCANNER_ELEMENT_ID);
        await tryStartScannerWithConfig(cfg);
        lastErr = null;
        break;
      } catch (err) {
        lastErr = err;
        await cleanupScanner();
      }
    }
    if (lastErr) {
      console.error(lastErr);
      showToast(textConfig.Home_Scan_Camera_Error);
      showScanPopup.value = false;
    }
  } finally {
    scanCameraStarting.value = false;
  }
}
</script>

<template>
  <div class="bottom-nav-wrapper">
    <!-- Floating Action Button for Scan -->
    <button
      type="button"
      @click="onFabClick"
      :class="[
        'fab-button',
        { 'fab-active': showScanPopup || showAmountPopup }
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
      teleport="body"
      :lazy-render="false"
      :style="{ height: '78%' }"
      :close-on-click-overlay="true"
      @open="onScanPopupOpen"
    >
      <div class="flex flex-col h-full min-h-0 p-4 box-border" style="background-color: var(--color-surface);">
        <div class="flex justify-between items-center shrink-0 gap-2 mb-3">
          <span class="text-base font-medium flex-1 min-w-0" style="color: var(--color-text);">{{ textConfig.Home_Scan_Title }}</span>
          <div class="flex items-center gap-1 shrink-0">
            <button
              type="button"
              class="amount-popup-qr-btn"
              :aria-label="textConfig.Home_Scan_Show_My_Qr_A11y"
              @click="openMyQrPopup"
            >
              <span class="material-symbols-outlined amount-popup-qr-icon">qr_code_2</span>
              我的收款碼
            </button>
            <span
              class="material-symbols-outlined cursor-pointer p-1"
              style="color: var(--color-text-muted);"
              @click="closeQrScanner"
            >close</span>
          </div>
        </div>
        <div
          :id="SCANNER_ELEMENT_ID"
          class="flex-1 min-h-[220px] w-full rounded-lg overflow-hidden"
          style="background-color: var(--color-bg);"
        />
      </div>
    </van-popup>

    <van-popup
      v-model:show="showAmountPopup"
      position="bottom"
      round
      :style="{ maxHeight: '85%' }"
      :close-on-click-overlay="true"
    >
      <div class="flex flex-col gap-4 p-4 pb-safe box-border" style="background-color: var(--color-surface);">
        <div class="flex justify-between items-center shrink-0 gap-2">
          <span class="text-base font-medium flex-1 min-w-0" style="color: var(--color-text);">{{ textConfig.Home_Scan_Pay_Title }}</span>
          <div class="flex items-center gap-1 shrink-0">
            <button
              type="button"
              class="amount-popup-qr-btn"
              :aria-label="textConfig.Home_Scan_Show_My_Qr_A11y"
              @click="openMyQrPopup"
            >
              <span class="material-symbols-outlined amount-popup-qr-icon">qr_code_2</span>
              <span>我的收款碼</span>

            </button>
            <span
              class="material-symbols-outlined cursor-pointer p-1"
              style="color: var(--color-text-muted);"
              @click="closeAmountPopup"
            >close</span>
          </div>
        </div>
        <div class="rounded-lg p-3 text-sm space-y-1" style="background-color: var(--color-bg); color: var(--color-text-muted);">
          <div>{{ textConfig.Home_Scan_Payee_Label }}</div>
          <div class="font-medium break-all" style="color: var(--color-text);">{{ formatPayeePreview(scannedPayeeRaw) }}</div>
        </div>
        <van-field
          :model-value="payAmount"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          :label="textConfig.Home_Scan_Amount_Label"
          :placeholder="payAmount.trim() ? '' : textConfig.Home_Scan_Amount_Placeholder"
          @update:model-value="onPayAmountUpdate"
        />
        <van-button type="primary" block round @click="submitScannedPay">
          {{ textConfig.Home_Scan_Btn_Confirm }}
        </van-button>
      </div>
    </van-popup>

    <van-popup
      v-model:show="showMyQrPopup"
      position="center"
      round
      :style="{ width: 'min(320px, 88vw)' }"
      :close-on-click-overlay="true"
    >
      <div class="p-5 flex flex-col items-center gap-3 box-border" style="background-color: var(--color-surface);">
        <span class="text-base font-semibold text-center" style="color: var(--color-text);">{{ textConfig.Home_Scan_My_Qr_Title }}</span>

        <div class="my-qr-frame">
          <img
            :src="myQrImageUrl"
            alt=""
            width="240"
            height="240"
            class="my-qr-img"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p class="text-xs text-center leading-relaxed px-1 m-0" style="color: var(--color-text-muted);">{{ textConfig.Home_Scan_My_Qr_Hint }}</p>
        <van-button block round @click="closeMyQrPopup">
          {{ textConfig.Common_Back }}
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<style scoped>
.bottom-nav-wrapper {
  position: relative;
}

.amount-popup-qr-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  padding: 5px0;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(56, 189, 248, 0.08) 100%);
  color: var(--color-primary);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 1px 4px rgba(37, 99, 235, 0.12);
}

.amount-popup-qr-btn:hover {
  transform: scale(1.04);
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.18);
}

.amount-popup-qr-btn:active {
  transform: scale(0.97);
}

:root.dark .amount-popup-qr-btn {
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.16) 0%, rgba(56, 189, 248, 0.1) 100%);
  box-shadow: 0 1px 4px rgba(96, 165, 250, 0.12);
}

.amount-popup-qr-icon {
  font-size: 22px;
  font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}

.my-qr-frame {
  padding: 12px;
  border-radius: 16px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
}

.my-qr-img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
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

:deep(.van-field__label) {
  color: #727272;
}

:deep(.van-field__control) {
  color: #4e4e4e;

  &::placeholder {
    color: #4e4e4e;
    opacity: 1;
  }
}

:deep(.van-field__error-message) {
  color: #ff0000;
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
