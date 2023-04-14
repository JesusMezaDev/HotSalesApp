import { storeToRefs } from 'pinia';

import hotSalesApi from '@/api/hotSalesApi';
import { useDialog } from '@/shared/dialog/composables';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import { useProductsStore } from '@/modules/products/store/products.store';
import router from '@/router';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import type { IProductResponse } from '../interfaces/productResponse.interface';

export const useProductList = () => {
    const { editProduct, productStoreList, isNewProduct } = storeToRefs(useProductsStore());
    const { hideSpinner, showSpinner } = useSpinner();
    const dialog = useDialog();
    const { handleError } = useHandleErrors();

    const getProduct = async(productId: number) => {
        showSpinner();
        try {
            const { data } = await hotSalesApi.get<IProductResponse>(`/products/${ productId }`);
            const { Ok, Message, Data } = data;

            hideSpinner();

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                dialog.show();
                return;
            }
            
            isNewProduct.value = false;
            editProduct.value = Data.Products[0];
            router.replace({ name: 'product' })
        } catch (error) {
            hideSpinner();
            handleError(error);
        }
    }

    const deleteProduct = async(productId: number) => {
        dialog.set({ dialogType: 'confirm', message: '¿Está seguro(a) de borrar el producto?',
            titleConfirm: 'Confirmar', labelOkButton: 'Si', labelCancelButton: 'No',
            onConfirmDialog: (): void => {
                confirmDeleteProduct(productId);
            }
        });
        dialog.show();
    }

    const confirmDeleteProduct = async(productId: number) => {
        showSpinner();
        try {
            const { data } = await hotSalesApi.delete(`/products/${ productId }`);
            const { Ok, Message, Data } = data;

            hideSpinner();

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message});
                dialog.show();
                return;
            }

            productStoreList.value = productStoreList.value.filter(({ Product_Id }) => Product_Id !== productId);
        } catch (error) {
            hideSpinner();
            handleError(error);
        }
    }

    return {
        getProduct,
        deleteProduct,
    }
}