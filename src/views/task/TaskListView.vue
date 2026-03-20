<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getTaskList } from '@/api/task';

const router = useRouter();
const list = ref([]);

onMounted(async () => {
  list.value = await getTaskList();
});

const toApply = (id) => {
  router.push(`/task/apply/${id}`);
};
</script>

<template>
  <div class="task-list-view pb-16 min-h-screen font-display" style="background-color: var(--color-bg); color: var(--color-text);">
    <van-nav-bar title="懸賞大廳" fixed placeholder />

    <van-list>
      <div
        v-for="task in list"
        :key="task.id"
        class="m-3 p-4 rounded-xl shadow-sm border relative overflow-hidden cursor-pointer"
        style="background-color: var(--color-surface); border-color: var(--color-border);"
        @click="toApply(task.id)"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-lg" style="color: var(--color-text);">{{ task.title }}</h3>
          <span class="font-bold text-xl text-orange-500">+{{ task.reward }}</span>
        </div>

        <div class="flex gap-2 mb-3">
          <van-tag v-for="tag in task.tags" :key="tag" type="warning" plain>{{ tag }}</van-tag>
          <van-tag type="danger" plain>手續費 {{ task.fee_rate * 100 }}%</van-tag>
        </div>

        <div class="text-sm flex justify-between items-center" style="color: var(--color-text-muted);">
          <span>狀態: {{ task.status === 'open' ? '進行中' : '已滿額' }}</span>
          <van-button size="mini" type="primary" plain round>查看詳情</van-button>
        </div>
      </div>
    </van-list>
  </div>
</template>
