import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { IProduct } from '@/modules/products/interfaces/productResponse.interface';

export const useProductsStore = defineStore('productStore', () => {
    const productStoreList = ref<IProduct[]>([]);

    const saveStoreProductList = (list: IProduct[]) => {
        productStoreList.value = [...list];
    }

    return {
        /* State properties */
        productStoreList,
        /* Getters */

        /* Actions */
        saveStoreProductList,
    }
});