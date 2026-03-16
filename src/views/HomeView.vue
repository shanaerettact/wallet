<script setup>
import { ref, onMounted } from 'vue';
import { getHomeData } from '@/api/home';
import BalanceCard from '@/components/home/BalanceCard.vue';
import QuickActions from '@/components/home/QuickActions.vue';
import ServiceGrid from '@/components/home/ServiceGrid.vue';
import TransactionList from '@/components/home/TransactionList.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import { textConfig } from '@/constants/textConfig';

const balanceData = ref(null);
const loading = ref(true);

onMounted(async () => {
  const minLoadTime = 800; // Minimum loading time in ms
  const startTime = Date.now();
  
  try {
    const res = await getHomeData();
    if (res.code === 200) {
      balanceData.value = res.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsedTime);
    
    setTimeout(() => {
      loading.value = false;
    }, remainingTime);
  }
});
</script>

<template>
  <div class="min-h-screen text-[#101018] dark:text-white font-display">
    <!-- Top Navigation Bar -->
    <PageHeader :title="textConfig.Home_PageTitle">
      <template #left>
        <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <span class="material-symbols-outlined text-primary dark:text-white">account_circle</span>
        </div>
      </template>
      <template #right>
        <button class="relative flex items-center justify-center">
          <span class="material-symbols-outlined text-[#101018] dark:text-white pt-1">notifications</span>
          <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
      </template>
    </PageHeader>

    <!-- Main Content -->
    <main class="pt-20 pb-24 max-w-md mx-auto px-4">
       <!-- Use a transition or simply v-if to swap -->
       <div v-if="!loading && balanceData">
          <BalanceCard :balance="balanceData.balance" />
          <QuickActions />
          <ServiceGrid />
          <TransactionList :transactions="balanceData.transactions" />
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
