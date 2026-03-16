<template>
  <div class="task-list-view pb-16">
    <van-nav-bar title="懸賞大廳" fixed placeholder />
    
    <van-list>
      <div v-for="task in list" :key="task.id" class="m-3 p-4 bg-white rounded-lg shadow-sm relative overflow-hidden" @click="toApply(task.id)">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-lg text-gray-800">{{ task.title }}</h3>
          <span class="text-orange-600 font-bold text-xl">+{{ task.reward }}</span>
        </div>
        
        <div class="flex gap-2 mb-3">
          <van-tag v-for="tag in task.tags" :key="tag" type="warning" plain>{{ tag }}</van-tag>
          <van-tag type="danger" plain>手續費 {{ task.fee_rate * 100 }}%</van-tag>
        </div>

        <div class="text-sm text-gray-500 flex justify-between items-center">
          <span>狀態: {{ task.status === 'open' ? '進行中' : '已滿額' }}</span>
          <van-button size="mini" type="primary" plain round>查看詳情</van-button>
        </div>
      </div>
    </van-list>
  </div>
</template>

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
