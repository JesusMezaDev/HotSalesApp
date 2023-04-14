import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { IProduct } from '@/modules/products/interfaces/productResponse.interface';

export const useProductsStore = defineStore('productStore', () => {
    const productStoreList = ref<IProduct[]>([]);

    return {
        /* State properties */
        productStoreList,
        /* Getters */
        /* Actions */
    }
});