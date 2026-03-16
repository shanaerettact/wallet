<script setup>
import { ref, onMounted } from 'vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import { textConfig } from '@/constants/textConfig';

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 600);
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center">
    <div class="w-full max-w-[480px] bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display pb-24 relative shadow-lg">
    <!-- Header -->
    <PageHeader :title="textConfig.ThirdPartyAuth_PageTitle">
        <template #left>
            <!-- Close icon per design source usually implies modal, but we are route based. Let's use back arrow for consistency or close if it feels like a modal task -->
            <!-- Design source used 'close'. Let's stick to consistent back arrow for routing unless it's a modal. 
                 Since user navigates TO it, Back is safer. -->
            <div class="flex items-center justify-center size-10 text-[#101018] dark:text-white cursor-pointer" @click="$router.back()">
              <span class="material-symbols-outlined">arrow_back_ios</span>
            </div>
        </template>
    </PageHeader>

    <main class="flex-1 overflow-y-auto pt-20">
      <!-- Merchant Profile Header -->
      <div class="flex p-6 justify-center">
        <div class="flex w-full flex-col gap-4 items-center">
          <div class="flex gap-4 flex-col items-center">
            <!-- Used CSS background image in source. I will use a simple placeholder or similar styling. -->
            <div class="size-24 rounded-full ring-4 ring-white dark:ring-gray-800 shadow-sm bg-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-4xl text-white">storefront</span>
            </div>
            <div class="flex flex-col items-center justify-center">
              <p class="text-[#101018] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">{{ textConfig.ThirdPartyAuth_Merchant_Name }}</p>
              <p class="text-[#5f5e8d] dark:text-gray-400 text-sm font-normal leading-normal text-center mt-1">{{ textConfig.ThirdPartyAuth_Merchant_Cert }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Amount Section -->
      <div class="px-4 text-center">
        <p class="text-[#5f5e8d] dark:text-gray-400 text-sm font-normal leading-normal pb-1">{{ textConfig.ThirdPartyAuth_Label_Total }}</p>
        <h1 class="text-[#101018] dark:text-white tracking-light text-[40px] font-bold leading-tight pb-6">¥ 1,280.00</h1>
      </div>

      <!-- Details Card -->
      <div class="mx-4 mb-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
        <div class="px-4 pt-5 pb-2 border-b border-gray-50 dark:border-gray-800">
          <h3 class="text-[#101018] dark:text-white text-base font-bold leading-tight tracking-[-0.015em]">{{ textConfig.ThirdPartyAuth_Label_DetailTitle }}</h3>
        </div>
        <div class="divide-y divide-gray-50 dark:divide-gray-800">
          <!-- Row 1 -->
          <div class="flex justify-between items-center px-4 py-4">
            <span class="text-[#5f5e8d] dark:text-gray-400 text-sm">{{ textConfig.ThirdPartyAuth_Label_OrderContent }}</span>
            <span class="text-[#101018] dark:text-white text-sm font-medium">{{ textConfig.ThirdPartyAuth_Value_OrderContent }}</span>
          </div>
          <!-- Row 2 -->
          <div class="flex justify-between items-center px-4 py-4">
            <span class="text-[#5f5e8d] dark:text-gray-400 text-sm">{{ textConfig.ThirdPartyAuth_Label_Method }}</span>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-sm">account_balance_wallet</span>
              <span class="text-[#101018] dark:text-white text-sm font-medium">{{ textConfig.ThirdPartyAuth_Value_Method }}</span>
            </div>
          </div>
          <!-- Row 3 -->
          <div class="flex justify-between items-center px-4 py-4">
            <span class="text-[#5f5e8d] dark:text-gray-400 text-sm">{{ textConfig.ThirdPartyAuth_Label_MerchantFlow }}</span>
            <span class="text-[#101018] dark:text-white text-sm font-mono">TX-9908231455</span>
          </div>
        </div>
      </div>

      <!-- Trust Indicator -->
      <div class="flex items-center justify-center gap-2 px-6 py-2">
        <span class="material-symbols-outlined text-green-500 text-[18px]">verified_user</span>
        <p class="text-gray-400 text-xs">{{ textConfig.ThirdPartyAuth_Trust_Scan }}</p>
      </div>
    </main>

    <!-- Bottom Fixed Action Bar -->
     <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 pb-safe z-40 max-w-[480px] mx-auto">
      <button class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2">
        <span class="material-symbols-outlined text-[20px]">lock</span>
        {{ textConfig.ThirdPartyAuth_Btn_Confirm }} ¥ 1,280.00
      </button>
      <p class="text-center text-xs text-gray-400 mt-4 px-8">
        {{ textConfig.ThirdPartyAuth_Disclaimer }}
      </p>
    </div>

    <!-- Full Screen Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div class="flex flex-col items-center gap-2">
         <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
         <p class="text-xs text-gray-500 font-medium">{{ textConfig.Common_Loading }}</p>
      </div>
    </div>
    </div>
  </div>
</template>
