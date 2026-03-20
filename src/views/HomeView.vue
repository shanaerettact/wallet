<script setup>
import { ref, onMounted } from 'vue';
import { getHomeData } from '@/api/home';
import BalanceCard from '@/components/home/BalanceCard.vue';
import QuickActions from '@/components/home/QuickActions.vue';
import ServiceGrid from '@/components/home/ServiceGrid.vue';
import TransactionList from '@/components/home/TransactionList.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import ThemeToggle from '@/components/ui/ThemeToggle.vue';
import { textConfig } from '@/constants/textConfig';

const balanceData = ref(null);
const loading = ref(true);

onMounted(async () => {
  const minLoadTime = 800;
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
  <div class="min-h-screen font-display" style="color: var(--color-text);">
    <!-- Top Navigation Bar -->
    <PageHeader :title="textConfig.Home_PageTitle">
      <template #left>
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-full"
          style="background-color: var(--color-surface-alt);"
        >
          <span class="material-symbols-outlined" style="color: var(--color-primary);">account_circle</span>
        </div>
      </template>
      <template #right>
        <div class="flex items-center gap-2">
          <!-- Notification bell -->
          <button
            class="relative flex items-center justify-center w-9 h-9 rounded-full border-none p-0"
            style="background-color: var(--color-surface-alt);"
            aria-label="Notifications"
          >
            <span class="material-symbols-outlined text-[20px]" style="color: var(--color-text);">notifications</span>
            <span class="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2" style="ring-color: var(--color-surface);"></span>
          </button>
          <!-- Theme Toggle -->
          <ThemeToggle />
        </div>
      </template>
    </PageHeader>

    <!-- Main Content -->
    <main class="pt-20 pb-24 max-w-md mx-auto px-4">
      <div v-if="!loading && balanceData">
        <BalanceCard :balance="balanceData.balance" />
        <QuickActions />
        <ServiceGrid />
        <TransactionList :transactions="balanceData.transactions" />
      </div>
    </main>

    <!-- Full Screen Loading Overlay -->
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
