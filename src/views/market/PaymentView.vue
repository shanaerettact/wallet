<template>
  <div class="payment-view bg-white min-h-screen flex flex-col">
    <!-- TopAppBar -->
    <div class="flex items-center bg-white p-4 pb-2 justify-between sticky top-0 z-10">
       <van-icon name="arrow-left" size="24" @click="router.back()" />
       <h2 class="text-lg font-bold flex-1 text-center pr-6">轉帳</h2>
    </div>

    <div class="flex-1 overflow-y-auto pb-80">
      <!-- Profile -->
      <div class="flex w-full flex-col gap-4 items-center pt-8">
         <div class="w-24 h-24 rounded-full bg-blue-50 border-4 border-primary/5 flex items-center justify-center">
            <van-icon name="manager" size="40" color="#00468C" />
         </div>
         <div class="text-center">
            <p class="text-[22px] font-bold">張三</p>
            <p class="text-gray-400 text-sm">WeChat ID: zhang_san_88</p>
         </div>
      </div>

      <div class="px-6 pt-8">
         <h3 class="font-medium">轉帳金額</h3>
      </div>
      
      <div class="px-6 py-4 flex items-baseline border-b border-gray-100 mx-6">
         <span class="text-3xl font-bold mr-2">¥</span>
         <h1 class="text-[48px] font-bold flex-1">1,200.00</h1>
         <div class="w-1 h-10 bg-primary animate-pulse rounded-full"></div>
      </div>

      <div class="px-6 pt-4">
         <p class="text-gray-400 text-sm">可用餘額: ¥8,800.00</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="fixed bottom-0 left-0 right-0 p-6 bg-white z-20">
       <button class="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20" @click="showAuth = true">
          確認轉帳
       </button>
    </div>

    <!-- Pin Popup -->
    <van-popup v-model:show="showAuth" position="bottom" round :style="{ height: 'auto' }">
        <div class="bg-white rounded-t-3xl pt-2 pb-8">
           <div class="flex justify-center py-3">
              <div class="w-12 h-1.5 bg-gray-200 rounded-full"></div>
           </div>
           
           <div class="text-center px-6 pb-6">
              <p class="text-sm text-gray-500 mb-4">請輸入支付密碼以確認交易</p>
              <van-password-input
                :value="password"
                :focused="showKeyboard"
                @focus="showKeyboard = true"
              />
           </div>

           <van-number-keyboard
                v-model="password"
                :show="showKeyboard"
                @blur="showKeyboard = false"
            />
        </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showLoadingToast } from 'vant';

const router = useRouter();
const showAuth = ref(false);
const showKeyboard = ref(true);
const password = ref('');

watch(password, (val) => {
    if (val.length === 6) {
        showLoadingToast({ message: '處理中...', forbidClick: true });
        setTimeout(() => {
            showSuccessToast('轉帳成功');
            router.push('/market');
        }, 1500);
    }
});
</script>
