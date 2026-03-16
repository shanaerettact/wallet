<script setup>
import { computed } from 'vue';
import { textConfig } from '@/constants/textConfig';

const props = defineProps({
  balance: {
    type: Object,
    required: true,
  },
  tier: {
    type: String,
    default: 'black', // black, gold, silver
    validator: (value) => ['black', 'gold', 'silver', 'diamond'].includes(value)
  }
});

const cardStyle = computed(() => {
  switch (props.tier) {
    case 'gold':
      return 'bg-gradient-to-br from-[#E6B980] via-[#EACDA3] to-[#C9965E] text-[#553C1E]';
    case 'silver':
      return 'bg-gradient-to-br from-[#E0E0E0] via-[#F5F5F5] to-[#B0B0B0] text-[#4A4A4A]';
    case 'diamond':
        return 'bg-gradient-to-br from-[#B9E9FC] via-[#E3F6FF] to-[#88C6F2] text-[#2C5F85]';
    case 'black':
    default:
      return 'bg-gradient-to-br from-[#2C2C35] via-[#4A4A5A] to-[#1A1A20] text-[#E6B980]';
  }
});

const tierName = computed(() => {
    switch (props.tier) {
        case 'gold': return textConfig.WalletCard_Level_Gold;
        case 'silver': return textConfig.WalletCard_Level_Silver;
        case 'diamond': return textConfig.WalletCard_Level_Diamond;
        case 'black': return textConfig.WalletCard_Level_Black;
        default: return textConfig.WalletCard_Level_Member;
    }
});

const shineEffect = computed(() => {
     if (props.tier === 'black') return 'bg-white/5';
     return 'bg-white/20';
});
</script>

<template>
  <div class="mb-6 perspective-1000">
    <div 
      class="relative overflow-hidden rounded-2xl p-6 shadow-xl transition-transform duration-500 hover:scale-[1.01]"
      :class="cardStyle"
    >
      <!-- Decorative Shine/Noise -->
      <div class="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <!-- Big Circle Deco -->
      <div 
        class="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl pointer-events-none"
        :class="shineEffect"
      ></div>

      <div class="relative z-10 flex flex-col h-full justify-between min-h-[180px]">
        <!-- Top Row -->
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-2">
            <!-- Chip Icon -->
            <div class="w-10 h-7 rounded bg-gradient-to-r from-[#e8cf99] to-[#cfae70] border border-[#a68852]/30 flex items-center justify-center overflow-hidden">
                <div class="w-full h-[1px] bg-black/10 my-[2px]"></div>
                <div class="absolute w-[1px] h-full bg-black/10 mx-[2px]"></div>
            </div>
             <!-- Contactless Icon -->
             <span class="material-symbols-outlined text-lg opacity-80 rotate-90" style="font-variation-settings: 'wght' 600">wifi</span>
          </div>
          <div class="text-right">
             <h3 class="font-bold text-lg tracking-wide uppercase italic">{{ tierName }}</h3>
             <p class="text-[10px] opacity-70 tracking-widest uppercase">{{ textConfig.WalletCard_Label_Premium }}</p>
          </div>
        </div>

        <!-- Middle Row (Card Number Masked) -->
        <div class="flex items-center justify-center my-4">
             <p class="font-mono text-xl tracking-[0.15em] opacity-90 text-shadow-sm">
                •••• •••• •••• 8829
             </p>
        </div>

        <!-- Bottom Row (Balance & Info) -->
        <div class="flex justify-between items-end">
            <div>
                 <p class="text-[10px] opacity-70 uppercase tracking-wider mb-1">{{ textConfig.WalletCard_Label_TotalAssets }}</p>
                 <div class="flex items-baseline gap-1">
                     <span class="text-2xl font-bold tracking-tight">¥ {{ balance.fiatEstimate.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</span>
                 </div>
            </div>
            <div class="text-right">
                <p class="text-[10px] opacity-70 uppercase tracking-wider mb-1">{{ textConfig.WalletCard_Label_AuthDate }}</p>
                <p class="text-sm font-medium tracking-wide">09/28</p>
            </div>
        </div>
      </div>
    </div>
    
    <!-- Tier Features / Benefits Teaser -->
    <div class="flex justify-between items-center px-2 mt-3 overflow-x-auto gap-4 no-scrollbar">
         <div class="flex items-center gap-1 shrink-0 text-xs text-secondary font-medium">
             <span class="material-symbols-outlined text-sm text-[gold]">workspace_premium</span>
             <span>{{ textConfig.WalletCard_Feature_FeeDiscount }}</span>
         </div>
          <div class="flex items-center gap-1 shrink-0 text-xs text-secondary font-medium">
             <span class="material-symbols-outlined text-sm text-[gold]">flash_on</span>
             <span>{{ textConfig.WalletCard_Feature_FastAudit }}</span>
         </div>
          <div class="flex items-center gap-1 shrink-0 text-xs text-secondary font-medium">
             <span class="material-symbols-outlined text-sm text-[gold]">support_agent</span>
             <span>{{ textConfig.WalletCard_Feature_Agent }}</span>
         </div>
    </div>
  </div>
</template>

<style scoped>
.text-shadow-sm {
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
</style>
