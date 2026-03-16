<template>
  <div class="app-container bg-gray-100 min-h-screen flex justify-center items-start font-display text-[#101018]">
    <div class="main-layout w-full max-w-[480px] bg-white min-h-screen shadow-2xl relative flex flex-col">
      <div class="flex-1 pb-[50px] overflow-x-hidden">
        <router-view />
      </div>

      <div class="fixed bottom-0 w-full max-w-[480px] z-50">
        <van-tabbar route placeholder safe-area-inset-bottom active-color="#00468C" class="!absolute bottom-0 w-full shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-t border-gray-100">
          <van-tabbar-item replace to="/" icon="home-o">首頁</van-tabbar-item>
          <van-tabbar-item replace to="/market" icon="shop-o">市場</van-tabbar-item>
          <van-tabbar-item replace to="/task" icon="todo-list-o">任務</van-tabbar-item>
          <van-tabbar-item replace to="/wallet" icon="bill-o">錢包</van-tabbar-item>
          <van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
:deep(.van-tabbar) {
  position: absolute;
}
</style>
