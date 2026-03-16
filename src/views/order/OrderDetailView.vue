<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
// Import local image for QR code if downloaded, otherwise use placeholder or the one from mapping if it exists
// From download_images.js log: 'https://lh3.googleusercontent.com/...': 'order_detail_img_1.png'
// Wait, the HTML shows a QR code image URL ending in '...pLRE'. 
// Let's check download_images.js mapping output again if possible or just assume standard naming if I ran it.
// I will use a direct import alias if checking fails, or just use the mapped name.
// "order_detail_img_1.png" seems to be mapped to the QR code based on context (it was in order_detail folder).

import qrCodeImg from '@/assets/images/order_detail_img_1.png';
import PageHeader from '@/components/layout/PageHeader.vue';

const route = useRoute();
// In real app, fetch order details using route.params.id
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-[#101018] dark:text-white min-h-screen pb-24">
    <!-- TopAppBar -->
    <!-- TopAppBar -->
    <PageHeader title="订单详情">
      <template #left>
        <div class="text-[#101018] dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer" @click="$router.back()">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </div>
      </template>
      <template #right>
        <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-[#101018] dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
          <span class="material-symbols-outlined">help</span>
        </button>
      </template>
    </PageHeader>

    <!-- Status & Timer Section -->
    <div class="bg-white dark:bg-[#1a1a3a] px-4 pt-20 pb-6">
      <div class="flex flex-col items-center">
        <h2 class="text-[#101018] dark:text-white text-[24px] font-bold leading-tight tracking-[-0.015em] mb-2">待支付</h2>
        <p class="text-[#5f5e8d] dark:text-gray-400 text-sm mb-4">请在倒计时结束前完成支付</p>
        <div class="flex gap-4 w-full max-w-[240px]">
          <div class="flex grow basis-0 flex-col items-stretch gap-2">
            <div class="flex h-14 grow items-center justify-center rounded-xl px-3 bg-[#f0f0f5] dark:bg-[#2a2a4a]">
              <p class="text-primary dark:text-blue-400 text-2xl font-bold leading-tight tracking-[-0.015em]">14</p>
            </div>
            <div class="flex items-center justify-center"><p class="text-[#5f5e8d] dark:text-gray-400 text-xs font-normal leading-normal">分</p></div>
          </div>
          <div class="flex grow basis-0 flex-col items-stretch gap-2">
            <div class="flex h-14 grow items-center justify-center rounded-xl px-3 bg-[#f0f0f5] dark:bg-[#2a2a4a]">
              <p class="text-primary dark:text-blue-400 text-2xl font-bold leading-tight tracking-[-0.015em]">59</p>
            </div>
            <div class="flex items-center justify-center"><p class="text-[#5f5e8d] dark:text-gray-400 text-xs font-normal leading-normal">秒</p></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Summary Card -->
    <div class="p-4 @container">
      <div class="bg-white dark:bg-[#1a1a3a] p-4 rounded-xl flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <p class="text-[#5f5e8d] dark:text-gray-400 text-sm font-normal">交易金额</p>
          <p class="text-primary dark:text-blue-400 text-xl font-bold">¥ 1,000.00</p>
        </div>
        <div class="h-[1px] bg-[#f0f0f5] dark:bg-[#2a2a4a]"></div>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <p class="text-[#5f5e8d] dark:text-gray-400 text-sm">购买数量</p>
            <p class="text-[#101018] dark:text-white text-sm font-medium">1,000.00 P2P 积分</p>
          </div>
          <div class="flex justify-between">
            <p class="text-[#5f5e8d] dark:text-gray-400 text-sm">单价</p>
            <p class="text-[#101018] dark:text-white text-sm font-medium">¥ 1.00</p>
          </div>
          <div class="flex justify-between">
            <p class="text-[#5f5e8d] dark:text-gray-400 text-sm">订单号</p>
            <p class="text-[#101018] dark:text-white text-sm font-medium">ORD-20231024-9842</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Seller Payment Info Section -->
    <div class="px-4">
      <h3 class="text-[#101018] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3 pt-4">卖家收款信息</h3>
      <div class="bg-white dark:bg-[#1a1a3a] p-4 rounded-xl flex flex-col gap-6">
        <!-- Method 1: Bank Account -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary dark:text-blue-400">account_balance</span>
            <p class="text-sm font-bold text-[#101018] dark:text-white">银行卡转账</p>
          </div>
          <div class="space-y-4 px-1">
            <div class="flex flex-col gap-1">
              <p class="text-[#5f5e8d] dark:text-gray-400 text-xs">收款人</p>
              <div class="flex justify-between items-center">
                <p class="text-[#101018] dark:text-white font-medium">张* (Zhang San)</p>
                <span class="material-symbols-outlined text-sm text-primary cursor-pointer">content_copy</span>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-[#5f5e8d] dark:text-gray-400 text-xs">收款银行</p>
              <p class="text-[#101018] dark:text-white font-medium">中国工商银行 (ICBC)</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-[#5f5e8d] dark:text-gray-400 text-xs">银行账号</p>
              <div class="flex justify-between items-center">
                <p class="text-[#101018] dark:text-white font-medium tracking-wider">6222 0810 0123 4567 890</p>
                <span class="material-symbols-outlined text-sm text-primary cursor-pointer">content_copy</span>
              </div>
            </div>
          </div>
        </div>
        <div class="h-[1px] bg-[#f0f0f5] dark:bg-[#2a2a4a]"></div>
        <!-- Method 2: QR Code -->
        <div class="flex flex-col items-center gap-4">
          <div class="flex items-center gap-2 self-start">
            <span class="material-symbols-outlined text-primary dark:text-blue-400">qr_code_2</span>
            <p class="text-sm font-bold text-[#101018] dark:text-white">收款二维码</p>
          </div>
          <div class="bg-background-light dark:bg-background-dark p-4 rounded-lg flex flex-col items-center gap-2">
            <div class="w-48 h-48 bg-white rounded-lg p-2">
              <div class="w-full h-full bg-center bg-no-repeat bg-cover rounded" :style="{ backgroundImage: `url(${qrCodeImg})` }"></div>
            </div>
            <p class="text-[#5f5e8d] dark:text-gray-400 text-xs">保存图片到相册后扫码</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Instructions -->
    <div class="p-4 mb-24">
      <div class="bg-primary/5 dark:bg-primary/20 border border-primary/10 p-4 rounded-xl">
        <div class="flex gap-3">
          <span class="material-symbols-outlined text-primary dark:text-blue-400 text-xl">info</span>
          <div class="flex-1">
            <p class="text-xs text-[#101018] dark:text-white font-bold mb-1">操作步骤：</p>
            <p class="text-xs text-[#5f5e8d] dark:text-gray-300 leading-relaxed">
              1. 复制收款信息或保存二维码<br/>
              2. 打开您的银行/支付App进行转账<br/>
              3. 转账成功后务必上传凭证并点击“我已付款”
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky Bottom Actions -->
    <div class="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white dark:bg-[#1a1a3a] border-t border-[#f0f0f5] dark:border-[#2a2a4a] p-4 flex gap-3 z-40">
      <button class="flex-1 h-12 flex items-center justify-center rounded-xl bg-[#f0f0f5] dark:bg-[#2a2a4a] text-[#101018] dark:text-white font-bold text-base transition-colors">
        取消订单
      </button>
      <button class="flex-[2] h-12 flex items-center justify-center rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/20 transition-all hover:bg-primary/90">
        <span class="material-symbols-outlined mr-2">upload_file</span>
        上传凭证
      </button>
    </div>
  </div>
</template>
