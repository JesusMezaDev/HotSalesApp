import hotSalesApi from '@/api/hotSalesApi';

import router from '@/router';

import type { ICustomerResponse, ICustomer } from '@/modules/customers/interfaces/customerResponse.interface'
import { useCustomersStore } from '../store/customers.store';
import { useDebouncer } from '@/shared/debouncer/composables/useDebouncer';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';

export const useCustomerSearchBar = () => {
    const { saveStoreCustomerList } = useCustomersStore();
    const dialog = useDialog();
    const { handleError } = useHandleErrors();
    const { hideSpinner, showSpinner } = useSpinner();

    const searchCustomer = async(value: string) => {
        if (value.trim().length === 0) {
            saveStoreCustomerList([]);
            return;
        }

        showSpinner();
        
        try {
            const { data } = await hotSalesApi<ICustomerResponse>(`/customers/${ value }`);
            const { Ok, Message, Data } = data;

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                dialog.show();
                return;
            }
            
            saveStoreCustomerList(Data.Customers);   
        } catch (error) {
            handleError(error);
        }
        hideSpinner();
    }

    const { searchKeyUp, searchTerm } = useDebouncer(searchCustomer);

    return {
        searchTerm,
        searchKeyUp,
        toNewCustomer: () => router.replace({ name: 'customer' })
    }
}