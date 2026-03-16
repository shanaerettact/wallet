<script setup>
import { textConfig } from '@/constants/textConfig';

defineProps({
  balance: {
    type: Object,
    required: true,
    default: () => ({
      total: 0,
      fiatEstimate: 0,
      todayProfit: 0,
      todayProfitRate: 0,
      available: 0
    })
  }
});
</script>

<template>
  <div class="mb-6">
    <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#020080] to-[#000050] p-6 text-white shadow-xl shadow-primary/20">
      <!-- Abstract Decorative Pattern -->
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" data-alt="Abstract blue gradient pattern"></div>
      <div class="relative z-10">
        <div class="flex items-center gap-2 mb-2 opacity-80">
          <p class="text-sm font-medium">{{ textConfig.Home_Balance_TotalAssets }}</p>
          <span class="material-symbols-outlined text-sm cursor-pointer">visibility</span>
        </div>
        <div class="flex items-baseline gap-2 mb-4">
          <p class="text-3xl font-bold tracking-tight">{{ balance.total.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</p>
          <p class="text-xs opacity-70">≈ ¥{{ balance.fiatEstimate.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex flex-col">
            <p class="text-[10px] uppercase opacity-60">{{ textConfig.Home_Balance_TodayProfit }}</p>
            <p class="text-sm font-semibold text-green-400">
              +{{ balance.todayProfit }} ({{ (balance.todayProfitRate * 100).toFixed(1) }}%)
            </p>
          </div>
          <div class="h-8 w-px bg-white/20"></div>
          <div class="flex flex-col">
            <p class="text-[10px] uppercase opacity-60">{{ textConfig.Home_Balance_Available }}</p>
            <p class="text-sm font-semibold">{{ balance.available.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
