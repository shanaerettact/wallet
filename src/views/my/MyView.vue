<script setup>
import { ref, onMounted } from 'vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import { textConfig } from '@/constants/textConfig';

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

const menuItems = [
  { icon: 'security', label: textConfig.My_Menu_Security, desc: textConfig.My_Menu_SecurityDesc },
  { icon: 'credit_card', label: textConfig.My_Menu_Payment, desc: textConfig.My_Menu_PaymentDesc },
  { icon: 'language', label: textConfig.My_Menu_Lang, desc: textConfig.My_Menu_LangDesc },
  { icon: 'help', label: textConfig.My_Menu_Help, desc: textConfig.My_Menu_HelpDesc },
  { icon: 'info', label: textConfig.My_Menu_About, desc: textConfig.My_Menu_AboutDesc },
];
</script>

<template>
  <div class="min-h-screen text-[#101018] dark:text-white font-display bg-background-light dark:bg-background-dark pb-24">
    <PageHeader :title="textConfig.My_PageTitle">
       <template #left>
        <!-- Avatar/Profile Icon for main tab consistency -->
        <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <span class="material-symbols-outlined text-primary dark:text-white">person</span>
        </div>
      </template>
      <template #right>
         <button class="relative flex items-center justify-center">
          <span class="material-symbols-outlined text-[#101018] dark:text-white pt-1">settings</span>
        </button>
      </template>
    </PageHeader>

    <main class="pt-24 px-4 space-y-6">
      <van-skeleton title avatar :row="6" :loading="loading">
        <!-- Profile Card -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
             <span class="material-symbols-outlined text-4xl text-gray-400">person</span>
             <!-- <img src="..." /> -->
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-bold">{{ textConfig.My_User_Name }}</h2>
            <p class="text-sm text-gray-500 mt-1">UID: 88293019</p>
            <div class="mt-2 flex gap-2">
               <span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">{{ textConfig.My_User_Verified }}</span>
               <span class="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded">{{ textConfig.My_User_Credit }}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-gray-400">chevron_right</span>
        </div>

        <!-- Menu List -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden px-2">
          <div 
            v-for="(item, index) in menuItems" 
            :key="item.label"
            class="flex items-center p-4 active:bg-gray-50 dark:active:bg-gray-800 transition-colors cursor-pointer"
            :class="index !== menuItems.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''"
          >
            <div class="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 mr-4">
              <span class="material-symbols-outlined">{{ item.icon }}</span>
            </div>
            <div class="flex-1">
              <p class="font-medium text-[#101018] dark:text-white">{{ item.label }}</p>
            </div>
            <div class="flex items-center gap-2">
               <span v-if="item.desc" class="text-xs text-gray-400">{{ item.desc }}</span>
               <span class="material-symbols-outlined text-gray-300 text-lg">chevron_right</span>
            </div>
          </div>
        </div>
        
        <!-- Logout Button -->
         <button class="w-full py-4 text-red-500 font-medium bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 active:scale-98 transition-transform">
           {{ textConfig.My_Action_Logout }}
         </button>
      </van-skeleton>
    </main>
    <!-- Full Screen Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div class="flex flex-col items-center gap-2">
         <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
         <p class="text-xs text-gray-500 font-medium">{{ textConfig.Common_Loading }}</p>
      </div>
    </div>
  </div>
</template>
