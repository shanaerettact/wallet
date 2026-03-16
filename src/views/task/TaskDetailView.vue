<script setup>
import PageHeader from '@/components/layout/PageHeader.vue';
</script>

<template>
  <div class="font-display bg-background-light dark:bg-background-dark min-h-screen text-[#101018] dark:text-white pb-32">
    <!-- Top Navigation Bar -->
    <PageHeader title="任务申请">
      <template #left>
        <div class="flex items-center justify-center size-10 text-[#101018] dark:text-white cursor-pointer" @click="$router.back()">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </div>
      </template>
    </PageHeader>

    <main class="flex-1 overflow-y-auto px-4 pt-20">
      <!-- Title Header -->
      <div class="pb-2">
        <h3 class="text-[#101018] dark:text-white tracking-tight text-2xl font-bold leading-tight">填写申请详情</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-1 font-display">请确保所有信息准确无误，以加速审核进度</p>
      </div>

      <!-- Section 1: Payment Reason -->
      <div class="py-3">
        <div class="flex flex-col w-full">
          <p class="text-[#101018] dark:text-white text-base font-medium leading-normal pb-2">支付原因</p>
          <textarea class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101018] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dadae7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary min-h-32 placeholder:text-[#5f5e8d] p-[15px] text-base font-normal leading-normal" placeholder="请详细描述本次任务申请的支付背景与必要性..."></textarea>
        </div>
      </div>

      <!-- Section 2: Recipient Details Header -->
      <div class="pt-4 pb-2">
        <h3 class="text-[#101018] dark:text-white text-lg font-bold leading-tight tracking-tight">收款人详情</h3>
      </div>

      <!-- Recipient Input Fields -->
      <div class="py-2 space-y-4">
        <label class="flex flex-col w-full">
          <p class="text-[#101018] dark:text-white text-base font-medium leading-normal pb-2">收款人姓名</p>
          <input class="form-input flex w-full min-w-0 flex-1 rounded-xl text-[#101018] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dadae7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary h-14 placeholder:text-[#5f5e8d] p-[15px] text-base font-normal leading-normal" placeholder="请输入真实姓名" type="text" value=""/>
        </label>
        <label class="flex flex-col w-full">
          <p class="text-[#101018] dark:text-white text-base font-medium leading-normal pb-2">钱包地址 / 账号</p>
          <div class="relative">
            <input class="form-input flex w-full min-w-0 flex-1 rounded-xl text-[#101018] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dadae7] dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary h-14 placeholder:text-[#5f5e8d] p-[15px] pr-12 text-base font-normal leading-normal" placeholder="输入或粘贴钱包地址" type="text" value=""/>
            <div class="absolute right-4 top-4 text-primary">
              <span class="material-symbols-outlined">content_paste</span>
            </div>
          </div>
        </label>
      </div>

      <!-- Section 3: Fee Breakdown Card -->
      <div class="mt-6">
        <div class="bg-primary/5 dark:bg-primary/10 rounded-xl p-5 border border-primary/10 dark:border-primary/20">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-primary font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-xl">info</span>
              高阶交易手续费
            </h4>
            <span class="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">High Tier</span>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">交易金额</span>
              <span class="text-[#101018] dark:text-white font-medium">1,200.00 USDT</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">基础费率 (2.5%)</span>
              <span class="text-[#101018] dark:text-white font-medium">30.00 USDT</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">高阶溢价 (1.5%)</span>
              <span class="text-[#101018] dark:text-white font-medium">18.00 USDT</span>
            </div>
            <div class="pt-3 border-t border-primary/10 dark:border-primary/20 flex justify-between items-end">
              <span class="text-[#101018] dark:text-white font-bold">预估总费用</span>
              <div class="text-right">
                <span class="text-xs text-gray-400 line-through block mb-[-4px]">30.00 USDT</span>
                <span class="text-primary text-xl font-bold">48.00 USDT</span>
              </div>
            </div>
          </div>
        </div>
        <p class="text-xs text-gray-400 mt-3 px-1 leading-relaxed">
            * 高阶手续费适用于大额 C2C 交易及优先匹配任务。具体费用以最终成交时为准。
        </p>
      </div>
    </main>

    <!-- Fixed Bottom Action Area -->
    <div class="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-t border-gray-100 dark:border-gray-800 safe-area-inset-bottom pb-24 z-40">
      <div class="max-w-[480px] mx-auto">
        <button class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
            提交申请
        </button>
      </div>
    </div>
  </div>
</template>
