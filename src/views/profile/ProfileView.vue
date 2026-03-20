<template>
  <div
    class="profile-view min-h-screen pb-16"
    style="background-color: var(--color-bg); color: var(--color-text);"
  >
    <!-- Header -->
    <div
      class="pt-12 pb-6 px-4"
      style="background-color: var(--color-primary);"
    >
      <div class="flex items-center gap-4">
        <van-image
          round
          width="60px"
          height="60px"
          :src="user.avatar"
        />
        <div>
          <h2 class="text-xl font-bold text-white">{{ user.username }}</h2>
          <div
            class="text-sm opacity-80 px-2 py-0.5 rounded inline-block mt-1 text-white"
            style="background-color: rgba(255,255,255,0.15);"
          >
            UID: {{ user.uid }}
          </div>
        </div>
      </div>
    </div>

    <!-- Cell groups use CSS variable overrides from style.css -->
    <van-cell-group class="mt-4">
      <van-cell title="身份驗證" is-link value="Lv.2 已認證" icon="manager-o" />
      <van-cell title="安全中心" is-link value="安全分 85"   icon="shield-o"  />
    </van-cell-group>

    <van-cell-group class="mt-4" title="常用功能">
      <van-cell title="我的訂單" is-link icon="orders-o"    />
      <van-cell title="我的任務" is-link icon="todo-list-o" />
      <van-cell title="收付款設置" is-link icon="card"      />
    </van-cell-group>

    <div class="p-4 mt-6">
      <van-button block color="#dc2626">登出帳號</van-button>
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
