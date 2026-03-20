<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '@/components/layout/PageHeader.vue';
import { textConfig } from '@/constants/textConfig';

const router = useRouter();
const activeTab = ref('buy');
const loading = ref(true);

onMounted(() => {
  setTimeout(() => { loading.value = false; }, 1000);
});

const merchants = [
  {
    name: '诚信恒通',
    trades: 14293,
    rate: 99.8,
    price: 7.21,
    quantity: 5000.00,
    limits: [2000, 36050],
    methods: ['account_balance_wallet', 'chat_bubble', 'credit_card'],
  },
  {
    name: '金牌币商张三',
    trades: 2105,
    rate: 96.5,
    price: 7.22,
    quantity: 1240.50,
    limits: [500, 8950],
    methods: ['account_balance_wallet', 'credit_card'],
  },
  {
    name: '全球通兑',
    trades: 8932,
    rate: 98.2,
    price: 7.24,
    quantity: 12480.00,
    limits: [10000, 90355],
    methods: ['credit_card'],
  }
];

const getMethodColor = (icon) => {
  if (icon === 'account_balance_wallet') return '#3b82f6';
  if (icon === 'chat_bubble') return '#22c55e';
  if (icon === 'credit_card') return '#d97706';
  return 'var(--color-text-muted)';
};

const goToDetail = () => { router.push('/market/detail'); };
</script>

<template>
  <div
    class="font-display min-h-screen pb-20 transition-colors duration-300"
    style="background-color: var(--color-bg); color: var(--color-text);"
  >
    <!-- Top Navigation Bar -->
    <PageHeader :title="textConfig.Market_PageTitle">
      <template #left>
        <div
          class="flex items-center cursor-pointer"
          style="color: var(--color-text);"
          @click="$router.push('/')"
        >
          <span class="material-symbols-outlined text-2xl">arrow_back_ios</span>
        </div>
      </template>
      <template #right>
        <button
          class="flex items-center justify-center"
          aria-label="Order history"
          style="color: var(--color-text);"
        >
          <span class="material-symbols-outlined text-[24px]">history</span>
        </button>
      </template>
      <template #bottom>
        <div class="px-4 pb-1">
          <div class="flex border-b" style="border-color: var(--color-border);">
            <a
              class="flex-1 flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 cursor-pointer transition-colors"
              :style="activeTab === 'buy'
                ? 'border-color: var(--color-primary);'
                : 'border-color: transparent;'"
              @click="activeTab = 'buy'"
            >
              <p
                class="text-sm font-bold"
                :style="activeTab === 'buy'
                  ? 'color: var(--color-primary);'
                  : 'color: var(--color-text-muted);'"
              >
                {{ textConfig.Market_Tab_Buy }}
              </p>
            </a>
            <a
              class="flex-1 flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 cursor-pointer transition-colors"
              :style="activeTab === 'sell'
                ? 'border-color: var(--color-primary);'
                : 'border-color: transparent;'"
              @click="activeTab = 'sell'"
            >
              <p
                class="text-sm font-bold"
                :style="activeTab === 'sell'
                  ? 'color: var(--color-primary);'
                  : 'color: var(--color-text-muted);'"
              >
                {{ textConfig.Market_Tab_Sell }}
              </p>
            </a>
          </div>
        </div>
      </template>
    </PageHeader>

    <!-- Filters & Chips -->
    <div
      class="sticky top-[112px] z-40 py-3 backdrop-blur-md mt-[112px]"
      style="background-color: color-mix(in srgb, var(--color-bg) 85%, transparent);"
    >
      <div class="flex gap-2 px-4 overflow-x-auto no-scrollbar">
        <button
          v-for="label in [textConfig.Market_Filter_USDT, textConfig.Market_Filter_Amount, textConfig.Market_Filter_Payment]"
          :key="label"
          class="flex h-9 shrink-0 items-center justify-center gap-1 rounded-full px-4 shadow-sm border"
          style="background-color: var(--color-surface); border-color: var(--color-border); color: var(--color-text);"
        >
          <p class="text-xs font-semibold">{{ label }}</p>
          <span class="material-symbols-outlined text-[18px]">expand_more</span>
        </button>
      </div>
    </div>

    <!-- Merchant List -->
    <main class="px-4 pb-24 space-y-4 pt-4">
      <div
        v-for="(merchant, index) in merchants"
        :key="index"
        class="rounded-xl p-4 shadow-sm border cursor-pointer transition-colors"
        style="background-color: var(--color-surface); border-color: var(--color-border);"
        @click="goToDetail"
      >
        <van-skeleton title avatar :row="3" :loading="loading">
          <!-- Merchant Header -->
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg overflow-hidden"
                style="background-color: rgba(2,0,128,0.10); color: var(--color-primary);"
              >
                <span class="material-symbols-outlined">person</span>
              </div>
              <div>
                <div class="flex items-center gap-1">
                  <h3 class="font-bold text-sm" style="color: var(--color-text);">{{ merchant.name }}</h3>
                  <span
                    class="material-symbols-outlined text-[16px] text-blue-500"
                    style="font-variation-settings: 'FILL' 1"
                  >verified</span>
                </div>
                <p class="text-[11px]" style="color: var(--color-text-muted);">
                  {{ merchant.trades.toLocaleString() }} {{ textConfig.Market_List_Trades }} | {{ merchant.rate }}% {{ textConfig.Market_List_Rate }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-[11px]" style="color: var(--color-text-muted);">{{ textConfig.Market_List_Price }}</p>
              <p class="text-lg font-bold leading-tight" style="color: var(--color-primary);">¥{{ merchant.price }}</p>
            </div>
          </div>

          <!-- Merchant Details -->
          <div class="flex justify-between items-end">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-[12px]" style="color: var(--color-text-muted);">{{ textConfig.Market_List_Quantity }}</span>
                <span class="text-[12px] font-medium" style="color: var(--color-text);">{{ merchant.quantity.toLocaleString('en-US', { minimumFractionDigits: 2 }) }} USDT</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[12px]" style="color: var(--color-text-muted);">{{ textConfig.Market_List_Limit }}</span>
                <span class="text-[12px] font-medium" style="color: var(--color-text);">¥{{ merchant.limits[0].toLocaleString() }} - ¥{{ merchant.limits[1].toLocaleString() }}</span>
              </div>
              <div class="flex gap-2 pt-1">
                <span
                  v-for="method in merchant.methods"
                  :key="method"
                  class="material-symbols-outlined text-[18px]"
                  :style="{ color: getMethodColor(method) }"
                >
                  {{ method }}
                </span>
              </div>
            </div>
            <button
              class="text-white px-6 py-2 rounded-lg text-sm font-bold active:scale-95 transition-transform shadow-md"
              style="background-color: var(--color-primary); box-shadow: 0 4px 12px rgba(2,0,128,0.20);"
            >
              {{ textConfig.Market_Action_Buy }}
            </button>
          </div>
        </van-skeleton>
      </div>
    </main>

    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 z-50 flex items-center justify-center"
      style="background-color: var(--color-bg);"
    >
      <div class="flex flex-col items-center gap-2">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2" style="border-color: var(--color-primary);"></div>
        <p class="text-xs font-medium" style="color: var(--color-text-muted);">{{ textConfig.Common_Loading }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
