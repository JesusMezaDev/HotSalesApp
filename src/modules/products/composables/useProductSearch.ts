import { onActivated, onDeactivated, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import hotSalesApi from '@/api/hotSalesApi';
import { useDebouncer } from "@/shared/debouncer/composables/useDebouncer";
import type { IProductResponse } from '@/modules/products/interfaces/productResponse.interface';
import { useProductsStore } from '@/modules/products/store/products.store';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import router from '@/router';
import { usePageNavigation } from '@/shared/page-navigation/composables/usePageNavigation';

export const useProductSearch = () => {
    const { productStoreList, isNewProduct } = storeToRefs(useProductsStore());
    const { currentPage, lastPage, navigationCallBack } = usePageNavigation();
    const dialog = useDialog();
    const { handleError } = useHandleErrors();
    const { showSpinner, hideSpinner } = useSpinner();

    const getAllProducts = async() => {
        showSpinner();
        try {
            // const { data } = await hotSalesApi<IProductResponse>(`/products/${ term }?page=${ currentPage.value }`);
            const { data } = await hotSalesApi(`/products?page=${ currentPage.value }`);
            const { Ok, Message, Data } = data;

            hideSpinner();
    
            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                return;
            }
            
            productStoreList.value = Data.Products;
            lastPage.value = Data.Pagination[0].TotalPages;
        } catch (error) {
            hideSpinner();
            handleError(error);
        }
    }

    const searchProducts = async(term: string) => {
        if (term.trim().length === 0) {
            // currentPage.value = 1;
            // lastPage.value = 1;
            await getAllProducts();
            return;
        }

        showSpinner();
        try {
            // const { data } = await hotSalesApi<IProductResponse>(`/products/${ term }?page=${ currentPage.value }`);
            const { data } = await hotSalesApi(`/products/${ term.trim() }?page=${ currentPage.value }`);
            const { Ok, Message, Data } = data;

            hideSpinner();
    
            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                return;
            }
            
            productStoreList.value = Data.Products;
            currentPage.value = 1;
            lastPage.value = Data.Pagination[0].TotalPages;
        } catch (error) {
            hideSpinner();
            handleError(error);
        }
    }

    const { searchKeyUp, searchTerm } = useDebouncer(searchProducts);

    onMounted(() => {
        getAllProducts();
    });

    onActivated(() => {
        navigationCallBack.value = ():void => { searchProducts(searchTerm.value); };
        searchProducts(searchTerm.value);
    });

    onDeactivated(() => {
        navigationCallBack.value = ():void => { };
        currentPage.value = 1;
        lastPage.value = 1;
        productStoreList.value = [];
        searchTerm.value = '';
    });

    return {
        searchKeyUp,
        searchTerm,
        addNewProduct: () => {
            isNewProduct.value = true;
            router.replace({ name: 'product' });
        }
    }
}