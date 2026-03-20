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
    <div class="card-gradient relative overflow-hidden rounded-xl p-6 shadow-xl" style="box-shadow: var(--shadow-primary);">
      <!-- Decorative glow orb -->
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
      <div class="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>

      <div class="relative z-10">
        <!-- Label row -->
        <div class="flex items-center gap-2 mb-2" style="opacity: 0.85;">
          <p class="text-sm font-medium" style="color: var(--color-card-text);">{{ textConfig.Home_Balance_TotalAssets }}</p>
          <span class="material-symbols-outlined text-sm cursor-pointer" style="color: var(--color-card-text);">visibility</span>
        </div>

        <!-- Balance amount -->
        <div class="flex items-baseline gap-2 mb-4">
          <p class="text-3xl font-bold tracking-tight" style="color: var(--color-card-text);">
            {{ balance.total.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
          </p>
          <p class="text-xs" style="color: var(--color-card-text); opacity: 0.65;">
            ≈ ¥{{ balance.fiatEstimate.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
          </p>
        </div>

        <!-- Stats row -->
        <div class="flex items-center gap-4">
          <div class="flex flex-col">
            <p class="text-[10px] uppercase tracking-wide" style="color: var(--color-card-text); opacity: 0.6;">
              {{ textConfig.Home_Balance_TodayProfit }}
            </p>
            <p class="text-sm font-semibold text-emerald-300">
              +{{ balance.todayProfit }} ({{ (balance.todayProfitRate * 100).toFixed(1) }}%)
            </p>
          </div>
          <div class="h-8 w-px" style="background-color: rgba(255,255,255,0.2);"></div>
          <div class="flex flex-col">
            <p class="text-[10px] uppercase tracking-wide" style="color: var(--color-card-text); opacity: 0.6;">
              {{ textConfig.Home_Balance_Available }}
            </p>
            <p class="text-sm font-semibold" style="color: var(--color-card-text);">
              {{ balance.available.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
