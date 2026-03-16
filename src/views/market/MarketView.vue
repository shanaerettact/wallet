<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '@/components/layout/PageHeader.vue';
import { textConfig } from '@/constants/textConfig';

const router = useRouter();
const activeTab = ref('buy');
const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

const merchants = [
  // ... existing items ...
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
  if (icon === 'account_balance_wallet') return 'text-blue-500';
  if (icon === 'chat_bubble') return 'text-green-500';
  if (icon === 'credit_card') return 'text-yellow-600';
  return 'text-gray-500';
};

const goToDetail = () => {
    router.push('/market/detail');
};
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-[#101018] dark:text-white transition-colors duration-300 pb-20 min-h-screen">
    <!-- Top Navigation Bar -->
    <!-- Top Navigation Bar -->
    <PageHeader :title="textConfig.Market_PageTitle">
      <template #left>
        <div class="flex items-center text-[#101018]" @click="$router.push('/')">
          <span class="material-symbols-outlined text-2xl cursor-pointer">arrow_back_ios</span>
        </div>
      </template>
      <template #right>
        <button class="flex items-center justify-center rounded-full text-[#101018]">
          <span class="material-symbols-outlined text-[24px]">history</span>
        </button>
      </template>
      <template #bottom>
         <div class="px-4 pb-1 bg-transparent">
          <div class="flex border-b border-gray-100 dark:border-gray-800">
            <a 
              class="flex-1 flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 cursor-pointer transition-colors"
              :class="activeTab === 'buy' ? 'border-primary' : 'border-transparent'"
              @click="activeTab='buy'"
            >
              <p class="text-sm font-bold" :class="activeTab === 'buy' ? 'text-primary' : 'text-gray-500'">{{ textConfig.Market_Tab_Buy }}</p>
            </a>
            <a 
              class="flex-1 flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 cursor-pointer transition-colors"
              :class="activeTab === 'sell' ? 'border-primary' : 'border-transparent'"
              @click="activeTab='sell'"
            >
              <p class="text-sm font-bold" :class="activeTab === 'sell' ? 'text-primary' : 'text-gray-500'">{{ textConfig.Market_Tab_Sell }}</p>
            </a>
          </div>
        </div>
      </template>
    </PageHeader>
    
    <!-- Filters & Chips -->
    <div class="sticky top-[112px] z-40 bg-[rgb(255_255_255_/_0.8)] dark:bg-background-dark py-3 backdrop-blur-md mt-[112px]">
      <div class="flex gap-2 px-4 overflow-x-auto no-scrollbar">
        <button class="flex h-9 shrink-0 items-center justify-center gap-1 rounded-full bg-white dark:bg-gray-800 px-4 shadow-sm border border-gray-50 dark:border-gray-700">
          <p class="text-xs font-semibold">{{ textConfig.Market_Filter_USDT }}</p>
          <span class="material-symbols-outlined text-[18px]">expand_more</span>
        </button>
        <button class="flex h-9 shrink-0 items-center justify-center gap-1 rounded-full bg-white dark:bg-gray-800 px-4 shadow-sm border border-gray-50 dark:border-gray-700">
          <p class="text-xs font-semibold">{{ textConfig.Market_Filter_Amount }}</p>
          <span class="material-symbols-outlined text-[18px]">expand_more</span>
        </button>
        <button class="flex h-9 shrink-0 items-center justify-center gap-1 rounded-full bg-white dark:bg-gray-800 px-4 shadow-sm border border-gray-50 dark:border-gray-700">
          <p class="text-xs font-semibold">{{ textConfig.Market_Filter_Payment }}</p>
          <span class="material-symbols-outlined text-[18px]">filter_list</span>
        </button>
      </div>
    </div>

    <!-- Merchant List -->
    <main class="px-4 pb-24 space-y-4 pt-4">
      <div 
        v-for="(merchant, index) in merchants" 
        :key="index"
        class="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-50 dark:border-gray-800"
        @click="goToDetail"
      >
        <van-skeleton title avatar :row="3" :loading="loading">
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg overflow-hidden">
                  <!-- Placeholder for Avatar -->
                 <span class="material-symbols-outlined">person</span>
              </div>
              <div>
                <div class="flex items-center gap-1">
                  <h3 class="font-bold text-sm">{{ merchant.name }}</h3>
                  <span class="material-symbols-outlined text-[16px] text-blue-500" style="font-variation-settings: 'FILL' 1">verified</span>
                </div>
                <p class="text-[11px] text-gray-500">{{ merchant.trades.toLocaleString() }} {{ textConfig.Market_List_Trades }} | {{ merchant.rate }}% {{ textConfig.Market_List_Rate }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-[11px] text-gray-400">{{ textConfig.Market_List_Price }}</p>
              <p class="text-lg font-bold text-primary leading-tight">¥{{ merchant.price }}</p>
            </div>
          </div>
          <div class="flex justify-between items-end">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-[12px] text-gray-500">{{ textConfig.Market_List_Quantity }}</span>
                <span class="text-[12px] font-medium">{{ merchant.quantity.toLocaleString('en-US', { minimumFractionDigits: 2 }) }} USDT</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[12px] text-gray-500">{{ textConfig.Market_List_Limit }}</span>
                <span class="text-[12px] font-medium">¥{{ merchant.limits[0].toLocaleString() }} - ¥{{ merchant.limits[1].toLocaleString() }}</span>
              </div>
              <div class="flex gap-2 pt-1">
                <span 
                  v-for="method in merchant.methods"
                  :key="method"
                  :class="['material-symbols-outlined text-[18px]', getMethodColor(method)]"
                >
                  {{ method }}
                </span>
              </div>
            </div>
            <button class="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md shadow-primary/20 active:scale-95 transition-transform">
              {{ textConfig.Market_Action_Buy }}
            </button>
          </div>
        </van-skeleton>
      </div>
    </main>
    <!-- Full Screen Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div class="flex flex-col items-center gap-2">
         <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
         <p class="text-xs text-gray-500 font-medium">{{ textConfig.Common_Loading }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
