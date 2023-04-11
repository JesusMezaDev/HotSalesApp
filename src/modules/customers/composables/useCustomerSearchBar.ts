import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import hotSalesApi from '@/api/hotSalesApi';
import { onMounted, ref } from 'vue';

import router from '@/router';

import type { ICustomerResponse, ICustomer } from '@/modules/customers/interfaces/customerResponse.interface'
import { useCustomersStore } from '../store/customers.store';

export const useCustomerSearchBar = () => {
    const searchTerm = ref<string>('');
    const debouncer: Subject<string> = new Subject();
    const emptyCustomerList = ref<ICustomer[]>([]);
    const { saveStoreCustomerList } = useCustomersStore();

    onMounted(() => {
        debouncer
        .pipe(
            debounceTime(300)
        )
        .subscribe(value => searchCustomer(value));
    });

    const searchKeyUp = () => {
        debouncer.next(searchTerm.value);
    }

    const searchCustomer = async(value: string) => {
        if (value.length === 0) {
            saveStoreCustomerList([]);
            return;
        }

        const { data } = await hotSalesApi<ICustomerResponse>(`/customers/${ value }`);
        const { Ok, Message, Data } = data;

        if (Ok) {
            saveStoreCustomerList(Data.Customers);
        }
    }

    return {
        searchTerm,
        // customerList,
        searchKeyUp,
        toNewCustomer: () => router.replace({ name: 'customer' })
    }
}