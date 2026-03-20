<script setup>
import { ref, onMounted } from 'vue';
import taskImg1 from '@/assets/images/task_img_1.png';
import taskImg2 from '@/assets/images/task_img_2.png';
import taskImg3 from '@/assets/images/task_img_3.png';
import PageHeader from '@/components/layout/PageHeader.vue';
import { useRouter } from 'vue-router';
import { textConfig } from '@/constants/textConfig';

const router = useRouter();
const loading = ref(true);

onMounted(() => {
  setTimeout(() => { loading.value = false; }, 1000);
});

const tabs = [
  textConfig.Task_Tab_All,
  textConfig.Task_Tab_P2P,
  textConfig.Task_Tab_C2C,
  textConfig.Task_Tab_Reward,
  textConfig.Task_Tab_Limit,
];
const activeTab = ref(0);

const tasks = [
  {
    id: 1092,
    title: 'P2P 积分兑换任务 #1092',
    tags: ['平台担保'],
    reward: 150.00,
    fee: 2.50,
    bgImage: taskImg1,
    requirements: [
      { icon: 'verified_user', text: '任务要求：需完成实名认证，账户余额 > 1000' },
      { icon: 'schedule',      text: '截止时间：剩余 14小时 25分' }
    ],
  },
  {
    id: 1093,
    title: 'C2C 快速交易助手',
    tags: ['高信用等级'],
    tagColor: 'green',
    reward: 80.00,
    fee: 1.20,
    bgImage: taskImg2,
    requirements: [
      { icon: 'trending_up', text: '任务要求：近30日成交率 > 95%' },
      { icon: 'history',     text: '预估耗时：约 5-10 分钟' }
    ],
  },
  {
    id: 1094,
    title: '海外积分 P2P 清算',
    tags: ['急需处理'],
    tagColor: 'red',
    reward: 300.00,
    fee: 5.00,
    bgImage: taskImg3,
    requirements: [
      { icon: 'public',  text: '任务要求：需持有海外账户，交易耗时 < 30分钟' },
      { icon: 'warning', text: '风险等级：中高风险 (收益补偿)' }
    ],
  }
];

const getTagStyle = (color) => {
  if (color === 'green')
    return { background: 'rgba(22,163,74,0.12)', color: '#16a34a' };
  if (color === 'red')
    return { background: 'rgba(220,38,38,0.12)', color: '#dc2626' };
  return { background: 'rgba(2,0,128,0.10)', color: 'var(--color-primary)' };
};

const goToDetail = () => { router.push('/task/detail'); };
</script>

<template>
  <div
    class="font-display min-h-screen pb-20 transition-colors duration-200"
    style="background-color: var(--color-bg); color: var(--color-text);"
  >
    <!-- Top Navigation Bar -->
    <PageHeader :title="textConfig.Task_PageTitle">
      <template #left>
        <div
          class="flex items-center gap-2 cursor-pointer"
          style="color: var(--color-text);"
          @click="$router.back()"
        >
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </div>
      </template>
      <template #right>
        <button
          class="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style="color: var(--color-text);"
          aria-label="Search tasks"
        >
          <span class="material-symbols-outlined">search</span>
        </button>
      </template>
      <template #bottom>
        <div class="flex overflow-x-auto no-scrollbar px-4 gap-6 pt-2 pb-1">
          <a
            v-for="(tab, index) in tabs"
            :key="tab"
            @click.prevent="activeTab = index"
            href="#"
            class="flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 whitespace-nowrap cursor-pointer transition-colors"
            :style="activeTab === index
              ? 'border-color: var(--color-primary); color: var(--color-primary);'
              : 'border-color: transparent; color: var(--color-text-muted);'"
          >
            <p
              class="text-sm"
              :class="activeTab === index ? 'font-bold' : 'font-medium'"
            >
              {{ tab }}
            </p>
          </a>
        </div>
      </template>
    </PageHeader>

    <!-- Task Cards -->
    <main class="p-4 space-y-4 max-w-2xl mx-auto pt-36">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="rounded-xl overflow-hidden cursor-pointer border shadow-sm"
        style="background-color: var(--color-surface); border-color: var(--color-border);"
        @click="goToDetail"
      >
        <van-skeleton title avatar :row="3" :loading="loading">
          <div class="p-4">
            <!-- Task Header -->
            <div class="flex items-center gap-2 mb-3 flex-wrap">
              <span
                v-for="tag in task.tags"
                :key="tag"
                class="text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                :style="getTagStyle(task.tagColor)"
              >
                {{ tag }}
              </span>
              <h3
                class="text-base font-bold"
                style="color: var(--color-text);"
              >
                {{ task.title }}
              </h3>
            </div>

            <!-- Task Body -->
            <div class="flex items-center gap-4 mb-4">
              <div
                class="h-16 w-16 bg-cover bg-center rounded-lg shrink-0"
                :style="{ backgroundImage: `url(${task.bgImage})` }"
              ></div>
              <div class="flex-1">
                <div class="flex items-baseline gap-1">
                  <span class="text-xs" style="color: var(--color-text-muted);">{{ textConfig.Task_List_Reward }}</span>
                  <span class="text-2xl font-bold" style="color: var(--color-primary);">
                    {{ task.reward.toFixed(2) }} <span class="text-sm">USDT</span>
                  </span>
                </div>
                <p class="text-xs" style="color: var(--color-text-muted);">
                  {{ textConfig.Task_List_Fee }}: {{ task.fee.toFixed(2) }} USDT
                </p>
              </div>
            </div>

            <!-- Requirements -->
            <div class="space-y-2 mb-4">
              <div
                v-for="(req, rIndex) in task.requirements"
                :key="rIndex"
                class="flex items-center gap-2 text-sm"
                style="color: var(--color-text-muted);"
              >
                <span class="material-symbols-outlined text-sm">{{ req.icon }}</span>
                <p>{{ req.text }}</p>
              </div>
            </div>

            <!-- Accept Button -->
            <button
              class="w-full text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style="background-color: var(--color-primary);"
            >
              <span>{{ textConfig.Task_Action_Accept }}</span>
              <span class="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </van-skeleton>
      </div>
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

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
