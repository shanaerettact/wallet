<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const toPay = () => {
  router.push('/payment/confirm');
};
</script>

<template>
  <div class="min-h-screen flex flex-col font-display" style="background-color: var(--color-bg); color: var(--color-text);">

    <!-- Top Bar -->
    <div
      class="flex items-center p-4 pb-2 justify-between sticky top-0 z-50 border-b"
      style="background-color: var(--color-surface); border-color: var(--color-border);"
    >
      <van-icon name="arrow-left" size="24" @click="router.back()" :style="{ color: 'var(--color-text)' }" />
      <h2 class="text-lg font-bold flex-1 text-center" style="color: var(--color-text);">訂單詳情</h2>
      <van-icon name="question-o" size="24" :style="{ color: 'var(--color-text-muted)' }" />
    </div>

    <!-- Status & Timer -->
    <div class="px-4 pt-6 pb-6 text-center" style="background-color: var(--color-surface);">
      <h2 class="text-[24px] font-bold mb-2" style="color: var(--color-text);">待支付</h2>
      <p class="text-sm mb-4" style="color: var(--color-text-muted);">請在倒計時結束前完成支付</p>
      <div class="flex gap-4 justify-center max-w-[240px] mx-auto">
        <div
          class="flex-1 rounded-xl h-14 flex items-center justify-center"
          style="background-color: var(--color-surface-alt);"
        >
          <span class="text-2xl font-bold" style="color: var(--color-primary);">14</span>
        </div>
        <div
          class="flex-1 rounded-xl h-14 flex items-center justify-center"
          style="background-color: var(--color-surface-alt);"
        >
          <span class="text-2xl font-bold" style="color: var(--color-primary);">59</span>
        </div>
      </div>
      <div class="flex gap-4 justify-center max-w-[240px] mx-auto mt-1 text-xs" style="color: var(--color-text-muted);">
        <span class="flex-1">分</span>
        <span class="flex-1">秒</span>
      </div>
    </div>

    <!-- Order Summary -->
    <div class="p-4">
      <div
        class="rounded-xl border p-4 space-y-4 shadow-sm"
        style="background-color: var(--color-surface); border-color: var(--color-border);"
      >
        <div class="flex justify-between items-center">
          <p class="text-sm" style="color: var(--color-text-muted);">交易金額</p>
          <p class="text-xl font-bold" style="color: var(--color-primary);">¥ 1,000.00</p>
        </div>
        <div class="h-px" style="background-color: var(--color-border);"></div>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span style="color: var(--color-text-muted);">購買數量</span>
            <span class="font-medium" style="color: var(--color-text);">1,000.00 P2P 積分</span>
          </div>
          <div class="flex justify-between text-sm">
            <span style="color: var(--color-text-muted);">單價</span>
            <span class="font-medium" style="color: var(--color-text);">¥ 1.00</span>
          </div>
          <div class="flex justify-between text-sm">
            <span style="color: var(--color-text-muted);">訂單號</span>
            <span class="font-medium font-mono" style="color: var(--color-text);">ORD-20231024-9842</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Seller Info -->
    <div class="px-4">
      <h3 class="text-lg font-bold pb-3 pt-2" style="color: var(--color-text);">賣家收款資訊</h3>
      <div
        class="border rounded-xl p-4 space-y-6 shadow-sm"
        style="background-color: var(--color-surface); border-color: var(--color-border);"
      >
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <van-icon name="card" size="20" :color="'var(--color-primary)'" />
            <p class="font-bold" style="color: var(--color-text);">銀行卡轉帳</p>
          </div>
          <div class="pl-1 space-y-3 text-sm">
            <div>
              <p class="text-xs mb-1" style="color: var(--color-text-muted);">收款人</p>
              <div class="flex justify-between">
                <span class="font-medium" style="color: var(--color-text);">張* (Zhang San)</span>
                <van-icon name="description" :color="'var(--color-primary)'" />
              </div>
            </div>
            <div>
              <p class="text-xs mb-1" style="color: var(--color-text-muted);">收款銀行</p>
              <span class="font-medium" style="color: var(--color-text);">中國工商銀行 (ICBC)</span>
            </div>
            <div>
              <p class="text-xs mb-1" style="color: var(--color-text-muted);">銀行帳號</p>
              <div class="flex justify-between">
                <span class="font-medium tracking-wider font-mono" style="color: var(--color-text);">6222 0810 0123 4567 890</span>
                <van-icon name="description" :color="'var(--color-primary)'" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Actions -->
    <div
      class="fixed bottom-0 left-0 right-0 border-t p-4 flex gap-3 pb-8"
      style="background-color: var(--color-surface); border-color: var(--color-border);"
    >
      <button
        class="flex-1 h-12 rounded-xl font-bold"
        style="background-color: var(--color-surface-alt); color: var(--color-text);"
      >
        取消訂單
      </button>
      <button
        class="flex-[2] h-12 rounded-xl font-bold shadow-lg active:scale-[0.98] transition-transform"
        style="background-color: var(--color-primary); color: var(--color-text-inverse); box-shadow: var(--shadow-primary);"
        @click="toPay"
      >
        我已付款
      </button>
    </div>
  </div>
</template>
