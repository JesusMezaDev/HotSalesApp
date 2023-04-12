import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { ICustomer } from '@/modules/customers/interfaces/customerResponse.interface';

export const useCustomersStore = defineStore('customerStore', () => {
    const customerStoreList = ref<ICustomer[]>([]);

    const saveStoreCustomerList = (list: ICustomer[]) => {
        customerStoreList.value = [...list];
    }

    return {
        /* State properties */
        customerStoreList,
        /* Getters */

        /* Actions */
        saveStoreCustomerList,
    }
});