<template>
  <div class="third-check-view bg-white min-h-screen flex flex-col">
    <div class="flex items-center p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <van-icon name="close" size="24" @click="router.back()" />
        <h2 class="text-lg font-bold flex-1 text-center pr-6">第三方支付授權</h2>
    </div>

    <div class="flex-1 overflow-y-auto">
        <div class="flex p-6 justify-center">
            <div class="flex flex-col items-center gap-4">
                 <div class="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
                    <van-icon name="shop-o" size="40" color="#00468C" />
                 </div>
                 <div class="text-center">
                    <p class="text-[22px] font-bold">全球積分商城</p>
                    <p class="text-gray-400 text-sm mt-1">認證特約商戶</p>
                 </div>
            </div>
        </div>

        <div class="px-4 text-center">
            <p class="text-gray-400 text-sm pb-1">支付總額</p>
            <h1 class="text-[40px] font-bold pb-6">¥ 1,280.00</h1>
        </div>

        <div class="mx-4 mb-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
             <div class="flex justify-between p-4">
                <span class="text-gray-400 text-sm">訂單內容</span>
                <span class="font-medium text-sm">跨境資產兌換</span>
             </div>
              <div class="flex justify-between p-4">
                <span class="text-gray-400 text-sm">交易方式</span>
                <div class="flex items-center gap-2">
                    <van-icon name="card" color="#00468C" />
                    <span class="font-medium text-sm">我的錢包 (餘額)</span>
                </div>
             </div>
             <div class="flex justify-between p-4">
                <span class="text-gray-400 text-sm">商戶流水</span>
                <span class="text-sm font-mono">TX-9908231455</span>
             </div>
        </div>

        <div class="flex items-center justify-center gap-2 px-6 py-2">
            <van-icon name="passed" color="#22c55e" />
            <p class="text-gray-400 text-xs">支付環境已通過安全掃描</p>
        </div>
    </div>

    <div class="p-4 pb-10 border-t border-gray-100 bg-white">
        <button class="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2" @click="showAuth=true">
            <van-icon name="lock" />
            確認支付 ¥ 1,280.00
        </button>
    </div>

    <!-- Password Popup -->
    <van-popup v-model:show="showAuth" position="bottom" style="height: auto">
       <div class="p-4 rounded-t-xl bg-white text-center pb-8">
         <h3 class="font-bold mb-4">輸入交易密碼</h3>
         <van-password-input
          :value="password"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
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
        showLoadingToast({ message: '授權中...', forbidClick: true });
        setTimeout(() => {
            showSuccessToast('授權成功');
            router.push('/wallet');
        }, 1500);
    }
});
</script>
