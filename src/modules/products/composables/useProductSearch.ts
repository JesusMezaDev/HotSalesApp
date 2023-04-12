import hotSalesApi from '@/api/hotSalesApi';

import { useDebouncer } from "@/shared/composables/useDebouncer";
import type { IProductResponse } from '@/modules/products/interfaces/productResponse.interface';
import { useProductsStore } from '@/modules/products/store/products.store';

export const useProductSearch = () => {
    const { saveStoreProductList } = useProductsStore();
    const searchProduct = async(value: string) => {
        if (value.trim().length === 0) {
            saveStoreProductList([]);
            return;
        }

        const { data } = await hotSalesApi<IProductResponse>(`/products/${ value }`);
        const { Ok, Message, Data } = data;
        console.log(Data);

        if (Ok) saveStoreProductList(Data.Products);
    }

    const { searchKeyUp, searchTerm } = useDebouncer(searchProduct);

    return {
        searchKeyUp,
        searchTerm,
    }
}