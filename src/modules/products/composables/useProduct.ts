import { onDeactivated, ref } from 'vue';

import { storeToRefs } from 'pinia';

import type { IProductRequest } from '@/modules/products/interfaces/productRequest.interface';
import hotSalesApi from '@/api/hotSalesApi';
import router from '@/router';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import { useProductsStore } from '@/modules/products/store/products.store';

export const useProduct = () => {
    const productTemplate = ref<IProductRequest>({
        name: '',
        description: '',
        productCategory_Id: 0,
    });
    const product = ref<IProductRequest>({ ...productTemplate.value });
    const { productStoreList } = storeToRefs(useProductsStore());
    const dialog = useDialog();
    const { handleError } = useHandleErrors();
    const {hideSpinner, showSpinner } = useSpinner();

    const saveProduct = async() => {
        showSpinner();
        try {
            let productRequest: IProductRequest = product.value;
            if (product.value.productCategory_Id === 0) {
                const { productCategory_Id, ...rest } = product.value;
                productRequest = rest;
            }

            const { data } = await hotSalesApi.post(`/products`, productRequest);
            const { Ok, Message, Data } = data;

            hideSpinner();

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                dialog.show();
                return;
            }

            dialog.set({ dialogType: 'success', message: 'El producto se guardó correctamente.',
                onCloseDialog: (): void => {
                    router.replace({ name: 'products' });
                }
            });
            dialog.show();
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

    onDeactivated(() => {
        product.value = { ...productTemplate.value };
    });

    return {
        product,
        deleteProduct,
        saveProduct,
    }
}