import { defineStore } from 'pinia';
import { ref } from 'vue';

const storeSetup = () => {
    const isLoading = ref<Boolean>(false);

    return {
        isLoading
    }
}

export const useSpinnerStore = defineStore('useSpinnerStore', storeSetup);