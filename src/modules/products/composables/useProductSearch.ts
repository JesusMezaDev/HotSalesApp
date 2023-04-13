import hotSalesApi from '@/api/hotSalesApi';
import { useDebouncer } from "@/shared/debouncer/composables/useDebouncer";
import type { IProductResponse } from '@/modules/products/interfaces/productResponse.interface';
import { useProductsStore } from '@/modules/products/store/products.store';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';

export const useProductSearch = () => {
    const { saveStoreProductList } = useProductsStore();
    const dialog = useDialog();
    const { handleError } = useHandleErrors();

    const searchProduct = async(value: string) => {
        if (value.trim().length === 0) {
            saveStoreProductList([]);
            return;
        }

        try {
            const { data } = await hotSalesApi<IProductResponse>(`/products/${ value }`);
            const { Ok, Message, Data } = data;
            console.log(Data);
    
            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                return;
            }
            
            saveStoreProductList(Data.Products);
        } catch (error) {
            handleError(error);
        }
    }

    const { searchKeyUp, searchTerm } = useDebouncer(searchProduct);

    return {
        searchKeyUp,
        searchTerm,
    }
}