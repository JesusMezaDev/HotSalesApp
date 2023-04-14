import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { IProduct } from '@/modules/products/interfaces/productResponse.interface';

export const useProductsStore = defineStore('productStore', () => {
    const productStoreList = ref<IProduct[]>([]);
    const editProduct = ref<IProduct>();
    const isNewProduct = ref<boolean>(false);

    return {
        /* State properties */
        editProduct,
        isNewProduct,
        productStoreList,
        /* Getters */
        /* Actions */
    }
});