<template>
  <div class="profile-view bg-gray-50 min-h-screen pb-16">
    <!-- Header -->
    <div class="bg-blue-600 pt-12 pb-6 px-4 text-white">
      <div class="flex items-center gap-4">
        <van-image
          round
          width="60px"
          height="60px"
          :src="user.avatar"
        />
        <div>
          <h2 class="text-xl font-bold">{{ user.username }}</h2>
          <div class="text-sm opacity-80 bg-blue-700/50 px-2 py-0.5 rounded inline-block mt-1">
            UID: {{ user.uid }}
          </div>
        </div>
      </div>
    </div>

    <van-cell-group class="mt-4">
      <van-cell title="身份驗證" is-link value="Lv.2 已認證" icon="manager-o" />
      <van-cell title="安全中心" is-link value="安全分 85" icon="shield-o" />
    </van-cell-group>

    <van-cell-group class="mt-4" title="常用功能">
      <van-cell title="我的訂單" is-link icon="orders-o" />
      <van-cell title="我的任務" is-link icon="todo-list-o" />
      <van-cell title="收付款設置" is-link icon="card" />
    </van-cell-group>

    <div class="p-4 mt-6">
      <van-button block color="#ee0a24">登出帳號</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserProfile } from '@/api/user';

const user = ref({});

onMounted(async () => {
  user.value = await getUserProfile();
});
</script>
