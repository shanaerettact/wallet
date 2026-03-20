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
  <div class="min-h-screen flex justify-center" style="background-color: var(--color-bg);">
    <div class="w-full max-w-[480px] min-h-screen flex flex-col font-display pb-24 relative shadow-lg"
         style="background-color: var(--color-bg);">

      <!-- Header -->
      <PageHeader :title="textConfig.ThirdPartyAuth_PageTitle">
        <template #left>
          <div
            class="flex items-center justify-center size-10 cursor-pointer"
            style="color: var(--color-text);"
            @click="$router.back()"
          >
            <span class="material-symbols-outlined">arrow_back_ios</span>
          </div>
        </template>
      </PageHeader>

      <main class="flex-1 overflow-y-auto pt-20">
        <!-- Merchant Profile Header -->
        <div class="flex p-6 justify-center">
          <div class="flex w-full flex-col gap-4 items-center">
            <div class="flex gap-4 flex-col items-center">
              <div
                class="size-24 rounded-full ring-4 shadow-sm flex items-center justify-center"
                style="
                  background-color: var(--color-primary);
                  ring-color: var(--color-surface);
                "
              >
                <span class="material-symbols-outlined text-4xl" style="color: var(--color-text-inverse);">storefront</span>
              </div>
              <div class="flex flex-col items-center justify-center">
                <p class="text-[22px] font-bold leading-tight tracking-tight text-center"
                   style="color: var(--color-text);">
                  {{ textConfig.ThirdPartyAuth_Merchant_Name }}
                </p>
                <p class="text-sm font-normal text-center mt-1"
                   style="color: var(--color-text-muted);">
                  {{ textConfig.ThirdPartyAuth_Merchant_Cert }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Amount Section -->
        <div class="px-4 text-center">
          <p class="text-sm font-normal leading-normal pb-1" style="color: var(--color-text-muted);">
            {{ textConfig.ThirdPartyAuth_Label_Total }}
          </p>
          <h1 class="text-[40px] font-bold leading-tight pb-6" style="color: var(--color-text);">
            ¥ 1,280.00
          </h1>
        </div>

        <!-- Details Card -->
        <div
          class="mx-4 mb-6 rounded-xl shadow-sm overflow-hidden border"
          style="background-color: var(--color-surface); border-color: var(--color-border);"
        >
          <div class="px-4 pt-5 pb-2" style="border-bottom: 1px solid var(--color-border);">
            <h3 class="text-base font-bold leading-tight tracking-tight" style="color: var(--color-text);">
              {{ textConfig.ThirdPartyAuth_Label_DetailTitle }}
            </h3>
          </div>

          <div>
            <!-- Row 1 -->
            <div class="flex justify-between items-center px-4 py-4" style="border-bottom: 1px solid var(--color-border);">
              <span class="text-sm" style="color: var(--color-text-muted);">{{ textConfig.ThirdPartyAuth_Label_OrderContent }}</span>
              <span class="text-sm font-medium" style="color: var(--color-text);">{{ textConfig.ThirdPartyAuth_Value_OrderContent }}</span>
            </div>
            <!-- Row 2 -->
            <div class="flex justify-between items-center px-4 py-4" style="border-bottom: 1px solid var(--color-border);">
              <span class="text-sm" style="color: var(--color-text-muted);">{{ textConfig.ThirdPartyAuth_Label_Method }}</span>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm" style="color: var(--color-primary);">account_balance_wallet</span>
                <span class="text-sm font-medium" style="color: var(--color-text);">{{ textConfig.ThirdPartyAuth_Value_Method }}</span>
              </div>
            </div>
            <!-- Row 3 -->
            <div class="flex justify-between items-center px-4 py-4">
              <span class="text-sm" style="color: var(--color-text-muted);">{{ textConfig.ThirdPartyAuth_Label_MerchantFlow }}</span>
              <span class="text-sm font-mono" style="color: var(--color-text);">TX-9908231455</span>
            </div>
          </div>
        </div>

        <!-- Trust Indicator -->
        <div class="flex items-center justify-center gap-2 px-6 py-2">
          <span class="material-symbols-outlined text-green-500 text-[18px]">verified_user</span>
          <p class="text-xs" style="color: var(--color-text-muted);">{{ textConfig.ThirdPartyAuth_Trust_Scan }}</p>
        </div>
      </main>

      <!-- Bottom Fixed Action Bar -->
      <div
        class="fixed bottom-0 left-0 right-0 border-t p-4 pb-safe z-40 max-w-[480px] mx-auto"
        style="background-color: var(--color-surface); border-color: var(--color-border);"
      >
        <button
          class="w-full font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
          style="background-color: var(--color-primary); color: var(--color-text-inverse); box-shadow: var(--shadow-primary);"
        >
          <span class="material-symbols-outlined text-[20px]">lock</span>
          {{ textConfig.ThirdPartyAuth_Btn_Confirm }} ¥ 1,280.00
        </button>
        <p class="text-center text-xs mt-4 px-8" style="color: var(--color-text-muted);">
          {{ textConfig.ThirdPartyAuth_Disclaimer }}
        </p>
      </div>

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
  </div>
</template>
