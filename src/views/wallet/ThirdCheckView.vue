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
    showLoadingToast({ message: '授權中...', forbidClick: true });
    setTimeout(() => {
      showSuccessToast('授權成功');
      router.push('/wallet');
    }, 1500);
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col font-display" style="background-color: var(--color-bg); color: var(--color-text);">

    <!-- Header -->
    <div
      class="flex items-center p-4 border-b sticky top-0 z-10"
      style="background-color: var(--color-surface); border-color: var(--color-border);"
    >
      <van-icon name="close" size="24" @click="router.back()" :style="{ color: 'var(--color-text)' }" />
      <h2 class="text-lg font-bold flex-1 text-center pr-6" style="color: var(--color-text);">第三方支付授權</h2>
    </div>

    <div class="flex-1 overflow-y-auto">
      <!-- Merchant Profile -->
      <div class="flex p-6 justify-center">
        <div class="flex flex-col items-center gap-4">
          <div
            class="w-24 h-24 rounded-full flex items-center justify-center"
            style="background-color: rgba(37,99,235,0.12);"
          >
            <van-icon name="shop-o" size="40" :color="'var(--color-primary)'" />
          </div>
          <div class="text-center">
            <p class="text-[22px] font-bold" style="color: var(--color-text);">全球積分商城</p>
            <p class="text-sm mt-1" style="color: var(--color-text-muted);">認證特約商戶</p>
          </div>
        </div>
      </div>

      <!-- Amount -->
      <div class="px-4 text-center">
        <p class="text-sm pb-1" style="color: var(--color-text-muted);">支付總額</p>
        <h1 class="text-[40px] font-bold pb-6" style="color: var(--color-text);">¥ 1,280.00</h1>
      </div>

      <!-- Details Card -->
      <div
        class="mx-4 mb-6 rounded-xl shadow-sm border overflow-hidden"
        style="background-color: var(--color-surface); border-color: var(--color-border);"
      >
        <div class="flex justify-between p-4" style="border-bottom: 1px solid var(--color-border);">
          <span class="text-sm" style="color: var(--color-text-muted);">訂單內容</span>
          <span class="font-medium text-sm" style="color: var(--color-text);">跨境資產兌換</span>
        </div>
        <div class="flex justify-between p-4" style="border-bottom: 1px solid var(--color-border);">
          <span class="text-sm" style="color: var(--color-text-muted);">交易方式</span>
          <div class="flex items-center gap-2">
            <van-icon name="card" :color="'var(--color-primary)'" />
            <span class="font-medium text-sm" style="color: var(--color-text);">我的錢包 (餘額)</span>
          </div>
        </div>
        <div class="flex justify-between p-4">
          <span class="text-sm" style="color: var(--color-text-muted);">商戶流水</span>
          <span class="text-sm font-mono" style="color: var(--color-text);">TX-9908231455</span>
        </div>
      </div>

      <!-- Trust badge -->
      <div class="flex items-center justify-center gap-2 px-6 py-2">
        <van-icon name="passed" color="#22c55e" />
        <p class="text-xs" style="color: var(--color-text-muted);">支付環境已通過安全掃描</p>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div
      class="p-4 pb-10 border-t"
      style="background-color: var(--color-surface); border-color: var(--color-border);"
    >
      <button
        class="w-full font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        style="background-color: var(--color-primary); color: var(--color-text-inverse); box-shadow: var(--shadow-primary);"
        @click="showAuth = true"
      >
        <van-icon name="lock" />
        確認支付 ¥ 1,280.00
      </button>
    </div>

    <!-- Password Popup -->
    <van-popup v-model:show="showAuth" position="bottom" style="height: auto">
      <div class="p-4 rounded-t-xl text-center pb-8" style="background-color: var(--color-surface);">
        <h3 class="font-bold mb-4" style="color: var(--color-text);">輸入交易密碼</h3>
        <van-password-input
          :value="password"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <van-number-keyboard
          v-model="password"
          :show="showKeyboard"
          @blur="showKeyboard = false"
        />
      </div>
    </van-popup>
  </div>
</template>
