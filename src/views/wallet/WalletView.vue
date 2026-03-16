<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '@/components/layout/PageHeader.vue';
import WalletCard from '@/components/wallet/WalletCard.vue';
import TransactionList from '@/components/home/TransactionList.vue';
import { textConfig } from '@/constants/textConfig';

const router = useRouter();
const currentTier = ref('black'); // Options: black, gold, silver, diamond
const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

// Mock data for wallet, reusing structure from Home
// In a real app, this would come from a store or API
const dummyBalance = {
  total: 12580.00,
  fiatEstimate: 90953.40,
  todayProfit: 128.50,
  todayProfitRate: 0.012,
  available: 12000.00
};

const dummyTransactions = [
  { id: 1, type: 'C2C 卖出', amount: '+ 5,000.00', status: 'completed', time: '14:30', date: '今天' },
  { id: 2, type: '三方支付', amount: '- 1,280.00', status: 'completed', time: '12:15', date: '今天' },
  { id: 3, type: '任务奖励', amount: '+ 150.00', status: 'completed', time: '09:45', date: '昨天' },
];

const goToThirdPartyAuth = () => {
  router.push('/wallet/third-auth');
};
</script>

<template>
  <div class="min-h-screen text-[#101018] dark:text-white font-display bg-background-light dark:bg-background-dark pb-24">
    <PageHeader :title="textConfig.Wallet_PageTitle">
      <template #left>
        <!-- No back button on main tab pages usually, or could enable if desired. 
             Home doesn't have one, it has avatar. 
             Wallet is a main tab. Let's stick to Home style or simple title.
             User request: "consistent with previously modified pages"
             Home has Avatar (left) and Notification (right).
             Let's replicate that for main tabs (Wallet, My).
        -->
        <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
           <span class="material-symbols-outlined text-primary dark:text-white">account_balance_wallet</span>
        </div>
      </template>
      <template #right>
        <button class="relative flex items-center justify-center">
          <span class="material-symbols-outlined text-[#101018] dark:text-white pt-1">history</span>
        </button>
      </template>
    </PageHeader>

    <main class="pt-20 px-4 space-y-6">
      <van-skeleton title avatar :row="6" :loading="loading">
        <!-- Membership/Wallet Card -->
        <WalletCard :balance="dummyBalance" :tier="currentTier" />

        <!-- Action Grid -->
        <div class="grid grid-cols-2 gap-4">
          <button 
            @click="goToThirdPartyAuth"
            class="flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 active:scale-95 transition-transform"
          >
            <div class="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-2">
               <span class="material-symbols-outlined text-primary text-2xl">swap_horiz</span>
            </div>
            <span class="font-bold text-sm">{{ textConfig.Wallet_Action_ThirdTransfer }}</span>
            <span class="text-xs text-gray-400 mt-1">{{ textConfig.Wallet_Action_ThirdTransferDesc }}</span>
          </button>

           <button class="flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 active:scale-95 transition-transform">
            <div class="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-2">
               <span class="material-symbols-outlined text-green-600 text-2xl">add_card</span>
            </div>
            <span class="font-bold text-sm">{{ textConfig.Wallet_Action_Deposit }}</span>
            <span class="text-xs text-gray-400 mt-1">{{ textConfig.Wallet_Action_DepositDesc }}</span>
          </button>
        </div>

        <!-- Transactions -->
         <div class="space-y-4">
          <div class="flex items-center justify-between">
              <h3 class="font-bold text-lg">{{ textConfig.Wallet_Section_RecentTransactions }}</h3>
              <span class="text-sm text-gray-400">{{ textConfig.Common_ViewAll }}</span>
          </div>
          <!-- Reusing TransactionList component logic or just simple list for now since TransactionList takes props -->
          <TransactionList :transactions="dummyTransactions" />
        </div>
      </van-skeleton>
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
