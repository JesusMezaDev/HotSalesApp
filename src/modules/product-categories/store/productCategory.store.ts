import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { IProductCategory } from '@/modules/product-categories/interfaces/productCategory.interface';

export const useProductCategoryStore = defineStore('productCategoryStore', () => {
    const productCategoryListStore = ref<IProductCategory[]>([]);

    return {
        productCategoryListStore,
    }
});