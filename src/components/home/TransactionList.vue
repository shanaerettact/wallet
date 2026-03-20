<script setup>
import { textConfig } from '@/constants/textConfig';

defineProps({
  transactions: {
    type: Array,
    default: () => []
  }
});

// Returns inline-style-safe icon config (no dark: Tailwind variants needed)
const getIconConfig = (type) => {
  if (type.includes('C2C'))
    return { icon: 'shopping_cart', bg: 'rgba(22,163,74,0.12)',  text: '#16a34a' };
  if (type.includes('Transfer') || type.includes('转账'))
    return { icon: 'person',        bg: 'rgba(37,99,235,0.12)',  text: '#2563eb' };
  if (type.includes('Top-up') || type.includes('充值'))
    return { icon: 'account_balance_wallet', bg: 'rgba(124,58,237,0.12)', text: '#7c3aed' };
  return { icon: 'paid', bg: 'rgba(107,114,128,0.12)', text: '#6b7280' };
};
</script>

<template>
  <div class="mb-6">
    <!-- Section Header -->
    <div class="flex items-center justify-between mb-3 px-1">
      <h3
        class="text-base font-bold"
        style="color: var(--color-text);"
      >
        {{ textConfig.Home_Transaction_Title }}
      </h3>
      <button
        class="text-xs font-medium"
        style="color: var(--color-primary);"
      >
        {{ textConfig.Home_Transaction_ViewMore }}
      </button>
    </div>

    <!-- List -->
    <div
      class="rounded-xl overflow-hidden border"
      style="background-color: var(--color-surface); border-color: var(--color-border);"
    >
      <div
        v-for="tx in transactions"
        :key="tx.id"
        class="flex items-center gap-4 p-4 border-b last:border-0"
        style="border-color: var(--color-border);"
      >
        <!-- Icon -->
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-full"
          :style="{
            backgroundColor: getIconConfig(tx.type).bg,
            color:           getIconConfig(tx.type).text,
          }"
        >
          <span class="material-symbols-outlined">{{ getIconConfig(tx.type).icon }}</span>
        </div>

        <!-- Details -->
        <div class="flex-1 min-w-0">
          <p
            class="text-sm font-bold truncate"
            style="color: var(--color-text);"
          >
            {{ tx.desc }}
          </p>
          <p
            class="text-xs"
            style="color: var(--color-text-muted);"
          >
            {{ tx.time }}
          </p>
        </div>

        <!-- Amount -->
        <div class="text-right">
          <p
            class="text-sm font-bold"
            :style="{ color: tx.flow === 'in' ? '#16a34a' : 'var(--color-text)' }"
          >
            {{ tx.flow === 'in' ? '+' : '-' }}{{ tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
          </p>
          <p
            class="text-[10px] uppercase"
            style="color: var(--color-text-muted);"
          >
            {{ tx.status }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
