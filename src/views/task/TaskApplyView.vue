<template>
  <div class="task-apply-view bg-gray-50 min-h-screen">
    <van-nav-bar title="申請任務" left-arrow @click-left="router.back()" fixed placeholder />
    
    <div v-if="task" class="p-4">
      <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h2 class="text-xl font-bold mb-2">{{ task.title }}</h2>
        <p class="text-gray-600 mb-4">{{ task.description }}</p>
        <div class="bg-orange-50 p-3 rounded text-orange-800 text-sm mb-2">
          ⚠️ 注意：本任務收取 {{ task.fee_rate * 100 }}% 高額手續費
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h3 class="font-bold mb-3">上傳證明</h3>
        <van-uploader v-model="fileList" multiple :max-count="3" />
        <p class="text-xs text-gray-400 mt-2">請上傳完成任務的截圖證明</p>
      </div>

      <van-button type="primary" block round size="large" @click="submit" :loading="submitting">
        提交申請
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTaskDetail } from '@/api/task';
import { showSuccessToast } from 'vant';

const route = useRoute();
const router = useRouter();
const task = ref(null);
const fileList = ref([]);
const submitting = ref(false);

onMounted(async () => {
  task.value = await getTaskDetail(route.params.id);
});

const submit = () => {
  if (fileList.value.length === 0) {
    return alert('請上傳證明圖片');
  }
  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    showSuccessToast('申請已提交');
    router.back();
  }, 1000);
};
</script>
