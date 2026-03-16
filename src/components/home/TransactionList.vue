<script setup>
import { textConfig } from '@/constants/textConfig';

defineProps({
  transactions: {
    type: Array,
    default: () => []
  }
});

const getIconConfig = (type) => {
  // Map type to icon and colors
  if (type.includes('C2C')) return { icon: 'shopping_cart', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600' };
  if (type.includes('Transfer') || type.includes('转账')) return { icon: 'person', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600' };
  if (type.includes('Top-up') || type.includes('充值')) return { icon: 'account_balance_wallet', bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600' };
  return { icon: 'paid', bg: 'bg-gray-100', text: 'text-gray-600' };
};
</script>

<template>
  <div class="mb-6">
    <div class="flex items-center justify-between mb-3 px-1">
      <h3 class="text-base font-bold">{{ textConfig.Home_Transaction_Title }}</h3>
      <button class="text-xs font-medium text-primary dark:text-blue-400">{{ textConfig.Home_Transaction_ViewMore }}</button>
    </div>
    <div class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
      <div 
        v-for="tx in transactions" 
        :key="tx.id"
        class="flex items-center gap-4 p-4 border-b border-gray-50 dark:border-gray-800 last:border-0"
      >
        <div :class="['flex size-10 shrink-0 items-center justify-center rounded-full', getIconConfig(tx.type).bg, getIconConfig(tx.type).text]">
          <span class="material-symbols-outlined">{{ getIconConfig(tx.type).icon }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold truncate">{{ tx.desc }}</p>
          <p class="text-xs text-gray-500">{{ tx.time }}</p>
        </div>
        <div class="text-right">
          <p :class="['text-sm font-bold', tx.flow === 'in' ? 'text-green-600' : 'text-gray-900 dark:text-gray-100']">
            {{ tx.flow === 'in' ? '+' : '-' }}{{ tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
          </p>
          <p class="text-[10px] text-gray-400 uppercase">{{ tx.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
