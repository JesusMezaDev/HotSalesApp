import { storeToRefs } from 'pinia';

import hotSalesApi from '@/api/hotSalesApi';
import { useDebouncer } from "@/shared/debouncer/composables/useDebouncer";
import type { IProductResponse } from '@/modules/products/interfaces/productResponse.interface';
import { useProductsStore } from '@/modules/products/store/products.store';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';

export const useProductSearch = () => {
    const { productStoreList } = storeToRefs(useProductsStore());
    const dialog = useDialog();
    const { handleError } = useHandleErrors();
    const { showSpinner, hideSpinner } = useSpinner();

    const searchProduct = async(value: string) => {
        if (value.trim().length === 0) {
            productStoreList.value = [];
            return;
        }

        try {
            showSpinner();
            const { data } = await hotSalesApi<IProductResponse>(`/products/${ value }`);
            const { Ok, Message, Data } = data;
            console.log(Data);
    
            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                return;
            }
            
            productStoreList.value = Data.Products;
        } catch (error) {
            handleError(error);
        }

        hideSpinner();
    }

    const { searchKeyUp, searchTerm } = useDebouncer(searchProduct);

    return {
        searchKeyUp,
        searchTerm,
    }
}