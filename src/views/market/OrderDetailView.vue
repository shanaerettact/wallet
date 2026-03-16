<template>
  <div class="order-detail-view bg-white min-h-screen flex flex-col">
    <!-- TopAppBar -->
    <div class="flex items-center bg-white p-4 pb-2 justify-between sticky top-0 z-50 border-b border-gray-100">
      <van-icon name="arrow-left" size="24" @click="router.back()" />
      <h2 class="text-lg font-bold flex-1 text-center">訂單詳情</h2>
      <van-icon name="question-o" size="24" />
    </div>

    <!-- Status & Timer -->
    <div class="px-4 pt-4 pb-6 bg-white text-center">
       <h2 class="text-[24px] font-bold mb-2">待支付</h2>
       <p class="text-gray-500 text-sm mb-4">請在倒計時結束前完成支付</p>
       <div class="flex gap-4 justify-center max-w-[240px] mx-auto">
          <div class="flex-1 bg-gray-100 rounded-xl h-14 flex items-center justify-center">
            <span class="text-primary text-2xl font-bold">14</span>
          </div>
          <div class="flex-1 bg-gray-100 rounded-xl h-14 flex items-center justify-center">
             <span class="text-primary text-2xl font-bold">59</span>
          </div>
       </div>
       <div class="flex gap-4 justify-center max-w-[240px] mx-auto mt-1 text-xs text-gray-400">
         <span class="flex-1">分</span><span class="flex-1">秒</span>
       </div>
    </div>

    <!-- Order Summary -->
    <div class="p-4">
      <div class="bg-white rounded-xl border border-gray-100 p-4 space-y-4 shadow-sm">
         <div class="flex justify-between items-center">
            <p class="text-gray-500 text-sm">交易金額</p>
            <p class="text-primary text-xl font-bold">¥ 1,000.00</p>
         </div>
         <div class="h-[1px] bg-gray-100"></div>
         <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">購買數量</span>
              <span class="font-medium">1,000.00 P2P 積分</span>
            </div>
             <div class="flex justify-between text-sm">
              <span class="text-gray-500">單價</span>
              <span class="font-medium">¥ 1.00</span>
            </div>
             <div class="flex justify-between text-sm">
              <span class="text-gray-500">訂單號</span>
              <span class="font-medium">ORD-20231024-9842</span>
            </div>
         </div>
      </div>
    </div>

    <!-- Seller Info -->
    <div class="px-4">
      <h3 class="text-lg font-bold pb-3 pt-4">賣家收款資訊</h3>
      <div class="bg-white border border-gray-100 rounded-xl p-4 space-y-6 shadow-sm">
         <!-- Bank -->
         <div class="space-y-4">
            <div class="flex items-center gap-2 text-primary">
               <van-icon name="card" size="20" />
               <p class="font-bold text-black">銀行卡轉帳</p>
            </div>
            <div class="pl-1 space-y-3 text-sm">
               <div>
                  <p class="text-gray-400 text-xs mb-1">收款人</p>
                  <div class="flex justify-between">
                     <span class="font-medium">張* (Zhang San)</span>
                     <van-icon name="description" color="#00468C" />
                  </div>
               </div>
               <div>
                  <p class="text-gray-400 text-xs mb-1">收款銀行</p>
                  <span class="font-medium">中國工商銀行 (ICBC)</span>
               </div>
               <div>
                  <p class="text-gray-400 text-xs mb-1">銀行帳號</p>
                  <div class="flex justify-between">
                     <span class="font-medium tracking-wider">6222 0810 0123 4567 890</span>
                     <van-icon name="description" color="#00468C" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3 pb-8">
       <button class="flex-1 h-12 rounded-xl bg-gray-100 font-bold text-gray-800">取消訂單</button>
       <button class="flex-[2] h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20" @click="toPay">
         我已付款
       </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const toPay = () => {
    router.push('/payment/confirm');
};
</script>
