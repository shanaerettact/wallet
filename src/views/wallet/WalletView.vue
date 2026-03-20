<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '@/components/layout/PageHeader.vue';
import WalletCard from '@/components/wallet/WalletCard.vue';
import TransactionList from '@/components/home/TransactionList.vue';
import { textConfig } from '@/constants/textConfig';

const router = useRouter();
const currentTier = ref('black');
const loading = ref(true);

onMounted(() => {
  setTimeout(() => { loading.value = false; }, 1000);
});

const dummyBalance = {
  total: 12580.00,
  fiatEstimate: 90953.40,
  todayProfit: 128.50,
  todayProfitRate: 0.012,
  available: 12000.00
};

const dummyTransactions = [
  { id: 1, type: 'C2C 卖出',  amount: 5000.00,  flow: 'in',  desc: 'C2C 卖出',  status: 'completed', time: '14:30' },
  { id: 2, type: '三方支付',  amount: 1280.00,  flow: 'out', desc: '三方支付',  status: 'completed', time: '12:15' },
  { id: 3, type: '任务奖励',  amount: 150.00,   flow: 'in',  desc: '任务奖励',  status: 'completed', time: '09:45' },
];

const goToThirdPartyAuth = () => { router.push('/wallet/third-auth'); };
</script>

<template>
  <div
    class="min-h-screen font-display pb-24"
    style="background-color: var(--color-bg); color: var(--color-text);"
  >
    <PageHeader :title="textConfig.Wallet_PageTitle">
      <template #left>
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-full"
          style="background-color: var(--color-surface-alt);"
        >
          <span class="material-symbols-outlined" style="color: var(--color-primary);">account_balance_wallet</span>
        </div>
      </template>
      <template #right>
        <button class="relative flex items-center justify-center" aria-label="Transaction history">
          <span class="material-symbols-outlined pt-1" style="color: var(--color-text);">history</span>
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
            class="flex flex-col items-center justify-center p-4 rounded-xl shadow-sm border active:scale-95 transition-transform"
            style="background-color: var(--color-surface); border-color: var(--color-border);"
          >
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center mb-2"
              style="background-color: rgba(37,99,235,0.10);"
            >
              <span class="material-symbols-outlined text-2xl" style="color: var(--color-primary);">swap_horiz</span>
            </div>
            <span class="font-bold text-sm" style="color: var(--color-text);">{{ textConfig.Wallet_Action_ThirdTransfer }}</span>
            <span class="text-xs mt-1" style="color: var(--color-text-muted);">{{ textConfig.Wallet_Action_ThirdTransferDesc }}</span>
          </button>

          <button
            class="flex flex-col items-center justify-center p-4 rounded-xl shadow-sm border active:scale-95 transition-transform"
            style="background-color: var(--color-surface); border-color: var(--color-border);"
          >
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center mb-2"
              style="background-color: rgba(16,185,129,0.10);"
            >
              <span class="material-symbols-outlined text-2xl" style="color: #059669;">add_card</span>
            </div>
            <span class="font-bold text-sm" style="color: var(--color-text);">{{ textConfig.Wallet_Action_Deposit }}</span>
            <span class="text-xs mt-1" style="color: var(--color-text-muted);">{{ textConfig.Wallet_Action_DepositDesc }}</span>
          </button>
        </div>

        <!-- Transactions -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg" style="color: var(--color-text);">{{ textConfig.Wallet_Section_RecentTransactions }}</h3>
            <span class="text-sm" style="color: var(--color-text-muted);">{{ textConfig.Common_ViewAll }}</span>
          </div>
          <TransactionList :transactions="dummyTransactions" />
        </div>
      </van-skeleton>
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
