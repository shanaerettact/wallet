import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useC2CStore = defineStore('c2c', () => {
    const activeOrder = ref(null);

    const setOrder = (order) => {
        activeOrder.value = order;
    };

    const updateStatus = (status) => {
        if (activeOrder.value) {
            activeOrder.value.status = status;
        }
    };

    return { activeOrder, setOrder, updateStatus };
});
