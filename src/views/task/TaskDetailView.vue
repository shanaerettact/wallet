<script setup>
import PageHeader from '@/components/layout/PageHeader.vue';
</script>

<template>
  <div
    class="font-display min-h-screen pb-32"
    style="background-color: var(--color-bg); color: var(--color-text);"
  >
    <!-- Top Navigation Bar -->
    <PageHeader title="任务申请">
      <template #left>
        <div
          class="flex items-center justify-center size-10 cursor-pointer"
          style="color: var(--color-text);"
          @click="$router.back()"
        >
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </div>
      </template>
    </PageHeader>

    <main class="flex-1 overflow-y-auto px-4 pt-20">
      <!-- Title -->
      <div class="pb-2">
        <h3
          class="tracking-tight text-2xl font-bold leading-tight"
          style="color: var(--color-text);"
        >
          填写申请详情
        </h3>
        <p class="text-sm mt-1 font-display" style="color: var(--color-text-muted);">
          请确保所有信息准确无误，以加速审核进度
        </p>
      </div>

      <!-- Payment Reason -->
      <div class="py-3">
        <div class="flex flex-col w-full">
          <p class="text-base font-medium leading-normal pb-2" style="color: var(--color-text);">支付原因</p>
          <textarea
            class="form-input flex w-full resize-none overflow-hidden rounded-xl focus:outline-0 focus:ring-2 min-h-32 p-[15px] text-base font-normal leading-normal"
            style="
              color: var(--color-text);
              background-color: var(--color-surface);
              border: 1px solid var(--color-border);
            "
            placeholder="请详细描述本次任务申请的支付背景与必要性..."
          ></textarea>
        </div>
      </div>

      <!-- Recipient Details -->
      <div class="pt-4 pb-2">
        <h3 class="text-lg font-bold leading-tight tracking-tight" style="color: var(--color-text);">收款人详情</h3>
      </div>

      <div class="py-2 space-y-4">
        <label class="flex flex-col w-full">
          <p class="text-base font-medium leading-normal pb-2" style="color: var(--color-text);">收款人姓名</p>
          <input
            class="form-input flex w-full rounded-xl focus:outline-0 focus:ring-2 h-14 p-[15px] text-base font-normal leading-normal"
            style="
              color: var(--color-text);
              background-color: var(--color-surface);
              border: 1px solid var(--color-border);
            "
            placeholder="请输入真实姓名"
            type="text"
          />
        </label>
        <label class="flex flex-col w-full">
          <p class="text-base font-medium leading-normal pb-2" style="color: var(--color-text);">钱包地址 / 账号</p>
          <div class="relative">
            <input
              class="form-input flex w-full rounded-xl focus:outline-0 focus:ring-2 h-14 p-[15px] pr-12 text-base font-normal leading-normal"
              style="
                color: var(--color-text);
                background-color: var(--color-surface);
                border: 1px solid var(--color-border);
              "
              placeholder="输入或粘贴钱包地址"
              type="text"
            />
            <div class="absolute right-4 top-4" style="color: var(--color-primary);">
              <span class="material-symbols-outlined">content_paste</span>
            </div>
          </div>
        </label>
      </div>

      <!-- Fee Breakdown Card -->
      <div class="mt-6">
        <div
          class="rounded-xl p-5 border"
          style="
            background-color: rgba(2,0,128,0.05);
            border-color: rgba(2,0,128,0.12);
          "
        >
          <div class="flex items-center justify-between mb-4">
            <h4
              class="font-bold flex items-center gap-2"
              style="color: var(--color-primary);"
            >
              <span class="material-symbols-outlined text-xl">info</span>
              高阶交易手续费
            </h4>
            <span
              class="text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
              style="background-color: var(--color-primary);"
            >
              High Tier
            </span>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span style="color: var(--color-text-muted);">交易金额</span>
              <span class="font-medium" style="color: var(--color-text);">1,200.00 USDT</span>
            </div>
            <div class="flex justify-between text-sm">
              <span style="color: var(--color-text-muted);">基础费率 (2.5%)</span>
              <span class="font-medium" style="color: var(--color-text);">30.00 USDT</span>
            </div>
            <div class="flex justify-between text-sm">
              <span style="color: var(--color-text-muted);">高阶溢价 (1.5%)</span>
              <span class="font-medium" style="color: var(--color-text);">18.00 USDT</span>
            </div>
            <div
              class="pt-3 border-t flex justify-between items-end"
              style="border-color: rgba(2,0,128,0.12);"
            >
              <span class="font-bold" style="color: var(--color-text);">预估总费用</span>
              <div class="text-right">
                <span
                  class="text-xs line-through block mb-[-4px]"
                  style="color: var(--color-text-muted);"
                >30.00 USDT</span>
                <span class="text-xl font-bold" style="color: var(--color-primary);">48.00 USDT</span>
              </div>
            </div>
          </div>
        </div>

        <p class="text-xs mt-3 px-1 leading-relaxed" style="color: var(--color-text-muted);">
          * 高阶手续费适用于大额 C2C 交易及优先匹配任务。具体费用以最终成交时为准。
        </p>
      </div>
    </main>

    <!-- Fixed Bottom Action -->
    <div
      class="fixed bottom-0 left-0 right-0 backdrop-blur-md p-4 border-t safe-area-inset-bottom pb-24 z-40"
      style="
        background-color: color-mix(in srgb, var(--color-surface) 85%, transparent);
        border-color: var(--color-border);
      "
    >
      <div class="max-w-[480px] mx-auto">
        <button
          class="w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
          style="background-color: var(--color-primary); box-shadow: 0 4px 16px rgba(2,0,128,0.20);"
        >
          提交申请
        </button>
      </div>
    </div>
  </div>
</template>
