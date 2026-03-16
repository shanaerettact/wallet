import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserProfile, getWalletBalance } from '@/api/user';

export const useUserStore = defineStore('user', () => {
    const profile = ref(null);
    const wallet = ref({ available: 0, frozen: 0 });

    const fetchInfo = async () => {
        profile.value = await getUserProfile();
        wallet.value = await getWalletBalance();
    };

    return { profile, wallet, fetchInfo };
});
