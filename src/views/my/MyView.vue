<script setup>
import { ref, onMounted } from 'vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import { textConfig } from '@/constants/textConfig';

const loading = ref(true);

onMounted(() => {
  setTimeout(() => { loading.value = false; }, 1000);
});

const menuItems = [
  { icon: 'security',    label: textConfig.My_Menu_Security, desc: textConfig.My_Menu_SecurityDesc },
  { icon: 'credit_card', label: textConfig.My_Menu_Payment,  desc: textConfig.My_Menu_PaymentDesc  },
  { icon: 'language',    label: textConfig.My_Menu_Lang,     desc: textConfig.My_Menu_LangDesc     },
  { icon: 'help',        label: textConfig.My_Menu_Help,     desc: textConfig.My_Menu_HelpDesc     },
  { icon: 'info',        label: textConfig.My_Menu_About,    desc: textConfig.My_Menu_AboutDesc    },
];
</script>

<template>
  <div
    class="min-h-screen font-display pb-24"
    style="background-color: var(--color-bg); color: var(--color-text);"
  >
    <PageHeader :title="textConfig.My_PageTitle">
      <template #left>
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-full"
          style="background-color: var(--color-surface-alt);"
        >
          <span class="material-symbols-outlined" style="color: var(--color-primary);">person</span>
        </div>
      </template>
      <template #right>
        <button
          class="relative flex items-center justify-center"
          aria-label="Settings"
          style="color: var(--color-text);"
        >
          <span class="material-symbols-outlined pt-1">settings</span>
        </button>
      </template>
    </PageHeader>

    <main class="pt-24 px-4 space-y-6">
      <van-skeleton title avatar :row="6" :loading="loading">

        <!-- Profile Card -->
        <div
          class="p-6 rounded-2xl shadow-sm border flex items-center gap-4"
          style="background-color: var(--color-surface); border-color: var(--color-border);"
        >
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden shrink-0"
            style="background-color: var(--color-surface-alt);"
          >
            <span class="material-symbols-outlined text-4xl" style="color: var(--color-text-muted);">person</span>
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-bold" style="color: var(--color-text);">{{ textConfig.My_User_Name }}</h2>
            <p class="text-sm mt-1" style="color: var(--color-text-muted);">UID: 88293019</p>
            <div class="mt-2 flex gap-2">
              <span
                class="text-[10px] px-2 py-0.5 rounded"
                style="background-color: rgba(2,0,128,0.10); color: var(--color-primary);"
              >{{ textConfig.My_User_Verified }}</span>
              <span
                class="text-[10px] px-2 py-0.5 rounded"
                style="background-color: rgba(16,185,129,0.12); color: #059669;"
              >{{ textConfig.My_User_Credit }}</span>
            </div>
          </div>
          <span class="material-symbols-outlined" style="color: var(--color-text-muted);">chevron_right</span>
        </div>

        <!-- Menu List -->
        <div
          class="rounded-2xl shadow-sm border overflow-hidden px-2"
          style="background-color: var(--color-surface); border-color: var(--color-border);"
        >
          <div
            v-for="(item, index) in menuItems"
            :key="item.label"
            class="flex items-center p-4 transition-colors cursor-pointer"
            :style="index !== menuItems.length - 1 ? 'border-bottom: 1px solid var(--color-border);' : ''"
          >
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center mr-4"
              style="background-color: var(--color-surface-alt); color: var(--color-text-muted);"
            >
              <span class="material-symbols-outlined">{{ item.icon }}</span>
            </div>
            <div class="flex-1">
              <p class="font-medium" style="color: var(--color-text);">{{ item.label }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span v-if="item.desc" class="text-xs" style="color: var(--color-text-muted);">{{ item.desc }}</span>
              <span class="material-symbols-outlined text-lg" style="color: var(--color-border);">chevron_right</span>
            </div>
          </div>
        </div>

        <!-- Logout -->
        <button
          class="w-full py-4 font-medium rounded-xl shadow-sm border active:scale-[0.98] transition-transform"
          style="
            color: #dc2626;
            background-color: var(--color-surface);
            border-color: var(--color-border);
          "
        >
          {{ textConfig.My_Action_Logout }}
        </button>

      </van-skeleton>
    </main>

    <!-- Loading Overlay -->
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
</template>
