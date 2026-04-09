<script setup>
import { showToast } from 'vant';
import { textConfig } from '@/constants/textConfig';

const handleAction = (action) => {
  showToast(`${action} clicked`);
};
</script>

<template>
  <div
    class="mb-6 rounded-xl p-4 shadow-sm border"
    style="background-color: var(--color-surface); border-color: var(--color-border);"
  >
    <div class="grid grid-cols-3 gap-4">
      <div
        class="flex flex-col items-center gap-2 cursor-pointer"
        @click="handleAction(textConfig.Home_Action_Deposit)"
      >
        <div
          class="rounded-full p-3 transition-colors"
          style="background-color: var(--color-surface-alt); color: var(--color-primary);"
        >
          <span class="material-symbols-outlined">add_circle</span>
        </div>
        <p class="text-xs font-medium" style="color: var(--color-text);">{{ textConfig.Home_Action_Deposit }}</p>
      </div>

      <div
        class="flex flex-col items-center gap-2 cursor-pointer"
        @click="handleAction(textConfig.Home_Action_Withdraw)"
      >
        <div
          class="rounded-full p-3 transition-colors"
          style="background-color: var(--color-surface-alt); color: var(--color-primary);"
        >
          <span class="material-symbols-outlined">arrow_circle_up</span>
        </div>
        <p class="text-xs font-medium" style="color: var(--color-text);">{{ textConfig.Home_Action_Withdraw }}</p>
      </div>

      <div
        class="flex flex-col items-center gap-2 cursor-pointer"
        @click="handleAction(textConfig.Home_Action_Pay)"
      >
        <div
          class="rounded-full p-3 transition-colors"
          style="background-color: var(--color-surface-alt); color: var(--color-primary);"
        >
          <span class="material-symbols-outlined">payments</span>
        </div>
        <p class="text-xs font-medium" style="color: var(--color-text);">{{ textConfig.Home_Action_Pay }}</p>
      </div>
    </div>
  </div>
</template>
