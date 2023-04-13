import hotSalesApi from '@/api/hotSalesApi';

import router from '@/router';

import type { ICustomerResponse, ICustomer } from '@/modules/customers/interfaces/customerResponse.interface'
import { useCustomersStore } from '../store/customers.store';
import { useDebouncer } from '@/shared/debouncer/composables/useDebouncer';

export const useCustomerSearchBar = () => {
    const { saveStoreCustomerList } = useCustomersStore();

    const searchCustomer = async(value: string) => {
        if (value.trim().length === 0) {
            saveStoreCustomerList([]);
            return;
        }

        const { data } = await hotSalesApi<ICustomerResponse>(`/customers/${ value }`);
        const { Ok, Message, Data } = data;

        if (Ok) {
            saveStoreCustomerList(Data.Customers);
        }
    }

    const { searchKeyUp, searchTerm } = useDebouncer(searchCustomer);

    return {
        searchTerm,
        searchKeyUp,
        toNewCustomer: () => router.replace({ name: 'customer' })
    }
}