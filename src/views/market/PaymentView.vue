<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showLoadingToast } from 'vant';

const router = useRouter();
const showAuth = ref(false);
const showKeyboard = ref(true);
const password = ref('');

watch(password, (val) => {
  if (val.length === 6) {
    showLoadingToast({ message: '處理中...', forbidClick: true });
    setTimeout(() => {
      showSuccessToast('轉帳成功');
      router.push('/market');
    }, 1500);
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col font-display" style="background-color: var(--color-bg); color: var(--color-text);">

    <!-- Top Bar -->
    <div
      class="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 border-b"
      style="background-color: var(--color-surface); border-color: var(--color-border);"
    >
      <van-icon name="arrow-left" size="24" @click="router.back()" :style="{ color: 'var(--color-text)' }" />
      <h2 class="text-lg font-bold flex-1 text-center pr-6" style="color: var(--color-text);">轉帳</h2>
    </div>

    <div class="flex-1 overflow-y-auto pb-80">
      <!-- Recipient Profile -->
      <div class="flex w-full flex-col gap-4 items-center pt-8">
        <div
          class="w-24 h-24 rounded-full border-4 flex items-center justify-center"
          style="background-color: rgba(37,99,235,0.10); border-color: rgba(37,99,235,0.08);"
        >
          <van-icon name="manager" size="40" :color="'var(--color-primary)'" />
        </div>
        <div class="text-center">
          <p class="text-[22px] font-bold" style="color: var(--color-text);">張三</p>
          <p class="text-sm" style="color: var(--color-text-muted);">WeChat ID: zhang_san_88</p>
        </div>
      </div>

      <!-- Amount Input area -->
      <div class="px-6 pt-8">
        <h3 class="font-medium" style="color: var(--color-text-muted);">轉帳金額</h3>
      </div>
      <div class="px-6 py-4 flex items-baseline border-b mx-6" style="border-color: var(--color-border);">
        <span class="text-3xl font-bold mr-2" style="color: var(--color-text);">¥</span>
        <h1 class="text-[48px] font-bold flex-1" style="color: var(--color-text);">1,200.00</h1>
        <div class="w-1 h-10 rounded-full animate-pulse" style="background-color: var(--color-primary);"></div>
      </div>
      <div class="px-6 pt-4">
        <p class="text-sm" style="color: var(--color-text-muted);">可用餘額: ¥8,800.00</p>
      </div>
    </div>

    <!-- Fixed CTA -->
    <div
      class="fixed bottom-0 left-0 right-0 p-6 z-20 border-t"
      style="background-color: var(--color-surface); border-color: var(--color-border);"
    >
      <button
        class="w-full font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform"
        style="background-color: var(--color-primary); color: var(--color-text-inverse); box-shadow: var(--shadow-primary);"
        @click="showAuth = true"
      >
        確認轉帳
      </button>
    </div>

    <!-- Pin Popup -->
    <van-popup v-model:show="showAuth" position="bottom" round :style="{ height: 'auto' }">
      <div class="rounded-t-3xl pt-2 pb-8" style="background-color: var(--color-surface);">
        <div class="flex justify-center py-3">
          <div class="w-12 h-1.5 rounded-full" style="background-color: var(--color-border);"></div>
        </div>
        <div class="text-center px-6 pb-6">
          <p class="text-sm mb-4" style="color: var(--color-text-muted);">請輸入支付密碼以確認交易</p>
          <van-password-input
            :value="password"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
          />
        </div>
        <van-number-keyboard
          v-model="password"
          :show="showKeyboard"
          @blur="showKeyboard = false"
        />
      </div>
    </van-popup>
  </div>
</template>
