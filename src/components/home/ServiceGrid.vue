<script setup>
import { textConfig } from '@/constants/textConfig';

// Static services for now
const services = [
  { name: textConfig.Home_Service_C2C, icon: 'group', colorArg: 'blue' },
  { name: textConfig.Home_Service_Task, icon: 'trophy', colorArg: 'amber' },
  { name: textConfig.Home_Service_Transfer, icon: 'send', colorArg: 'indigo' },
  { name: textConfig.Home_Service_Bill, icon: 'description', colorArg: 'emerald' }
];

// Helper for dynamic classes won't work easily with Tailwind v4 atomic compilation unless classes are full strings in code or safelisted.
// Safest to write out the classes or use a map.
// Based on code.html:
// C2C: bg-blue-50 text-blue-600
// Bounty: bg-amber-50 text-amber-600
// Transfer: bg-indigo-50 text-indigo-600
// Bill: bg-emerald-50 text-emerald-600

const getColorClasses = (color) => {
  const map = {
    blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
    amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400' },
    indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400' },
    emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400' }
  };
  return map[color] || map.blue;
};
</script>

<template>
  <div class="mb-6">
    <h3 class="text-base font-bold mb-3 px-1">{{ textConfig.Home_Service_Title }}</h3>
    <div class="grid grid-cols-2 gap-3">
      <div 
        v-for="service in services" 
        :key="service.name"
        class="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 transition-all hover:border-primary/30 cursor-pointer"
      >
        <div :class="['p-2 rounded-lg', getColorClasses(service.colorArg).bg, getColorClasses(service.colorArg).text]">
          <span class="material-symbols-outlined">{{ service.icon }}</span>
        </div>
        <h2 class="text-sm font-bold">{{ service.name }}</h2>
      </div>
    </div>
  </div>
</template>
