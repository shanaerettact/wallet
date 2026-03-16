<script setup>
import { showToast } from 'vant';
import { textConfig } from '@/constants/textConfig';

const handleAction = (action) => {
  showToast(`${action} clicked`);
};
</script>

<template>
  <div class="mb-6 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
    <div class="grid grid-cols-4 gap-2">
      <div class="flex flex-col items-center gap-2 cursor-pointer" @click="handleAction(textConfig.Home_Action_Deposit)">
        <div class="rounded-full bg-primary/10 p-3 text-primary dark:text-white transition-colors hover:bg-primary/20">
          <span class="material-symbols-outlined">add_circle</span>
        </div>
        <p class="text-xs font-medium">{{ textConfig.Home_Action_Deposit }}</p>
      </div>
      <div class="flex flex-col items-center gap-2 cursor-pointer" @click="handleAction(textConfig.Home_Action_Withdraw)">
        <div class="rounded-full bg-primary/10 p-3 text-primary dark:text-white transition-colors hover:bg-primary/20">
          <span class="material-symbols-outlined">arrow_circle_up</span>
        </div>
        <p class="text-xs font-medium">{{ textConfig.Home_Action_Withdraw }}</p>
      </div>
      <div class="flex flex-col items-center gap-2 cursor-pointer" @click="handleAction(textConfig.Home_Action_Scan)">
        <div class="rounded-full bg-primary/10 p-3 text-primary dark:text-white transition-colors hover:bg-primary/20">
          <span class="material-symbols-outlined">qr_code_scanner</span>
        </div>
        <p class="text-xs font-medium">{{ textConfig.Home_Action_Scan }}</p>
      </div>
      <div class="flex flex-col items-center gap-2 cursor-pointer" @click="handleAction(textConfig.Home_Action_Pay)">
        <div class="rounded-full bg-primary/10 p-3 text-primary dark:text-white transition-colors hover:bg-primary/20">
          <span class="material-symbols-outlined">payments</span>
        </div>
        <p class="text-xs font-medium">{{ textConfig.Home_Action_Pay }}</p>
      </div>
    </div>
  </div>
</template>
