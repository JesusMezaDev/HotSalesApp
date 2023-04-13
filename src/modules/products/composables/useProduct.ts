import { onDeactivated, ref } from 'vue';

import type { IProductRequest } from '@/modules/products/interfaces/productRequest.interface';
import hotSalesApi from '@/api/hotSalesApi';
import router from '@/router';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';

export const useProduct = () => {
    const productTemplate = ref<IProductRequest>({
        name: '',
        description: '',
        productCategory_Id: null,
    });
    const product = ref<IProductRequest>({ ...productTemplate.value });
    const dialog = useDialog();
    const { handleError } = useHandleErrors();

    const saveProduct = async() => {
        try {
            const { data } = await hotSalesApi.post(`/products`, product.value);
            const { Ok, Message, Data } = data;

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                return;
            }

            dialog.set({ dialogType: 'success', message: 'El producto se guardó correctamente.',
                onCloseDialog: () => {
                    router.replace({ name: 'products' });
                }
            });
            dialog.show();
        } catch (error) {
            handleError(error);
        }
    }

    const deleteProduct = async(productId: number) => {
        dialog.set({ dialogType: 'confirm', message: '¿Está seguro(a) de borrar el producto?',
            titleConfirm: 'Confirmar', labelOkButton: 'Si', labelCancelButton: 'No',
            onConfirmDialog: () => confirmDeleteProduct(productId)
        });
        dialog.show();
    }

    const confirmDeleteProduct = async(productId: number) => {
        try {
            const { data } = await hotSalesApi.delete(`/products/${ productId }`);
            const { Ok, Message, Data } = data;

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message});
                dialog.show();
                return;
            }

            //TODO: falta agregar la búsqueda
        } catch (error) {
            handleError(error);
        }
    }

    onDeactivated(() => {
        console.log('Entró a onDeactivated');
        product.value = { ...productTemplate.value };
        console.log(product.value);
    });

    return {
        product,
        deleteProduct,
        saveProduct,
    }
}