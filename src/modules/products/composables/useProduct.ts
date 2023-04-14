import { onActivated, onDeactivated, ref } from 'vue';

import { storeToRefs } from 'pinia';

import type { IProductRequest } from '@/modules/products/interfaces/productRequest.interface';
import hotSalesApi from '@/api/hotSalesApi';
import router from '@/router';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import { useProductsStore } from '@/modules/products/store/products.store';
import type { IGeneralInterface } from '@/interfaces/generalResponse.interface';

export const useProduct = () => {
    const productTemplate = ref<IProductRequest>({
        name: '',
        description: '',
        productCategory_Id: 0,
    });
    const product = ref<IProductRequest>({ ...productTemplate.value });
    const { editProduct, isNewProduct, productStoreList } = storeToRefs(useProductsStore());
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

            const { data } = await hotSalesApi.post<IGeneralInterface>(`/products`, productRequest);
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

    const updateProduct = async() => {
        showSpinner();
        try {
            let productRequest: IProductRequest = product.value;
            if (product.value.productCategory_Id === 0) {
                const { productCategory_Id, ...rest } = product.value;
                productRequest = rest;
            }
            
            const { data } = await hotSalesApi.patch<IGeneralInterface>(`/products`, productRequest);
            const { Ok, Message, Data } = data;

            hideSpinner();

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                dialog.show();
                return;
            }

            let productListModified = productStoreList.value.filter(p => p.Product_Id !== productRequest.product_id);
            productListModified.push({
                Product_Id: productRequest.product_id!,
                Name: productRequest.name,
                ProductCategory_Id: productRequest.productCategory_Id,
                Description: productRequest.description,
            });
            productStoreList.value = productListModified;

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

    onActivated(() => {
        if (editProduct.value) {
            product.value = {
                product_id: editProduct.value.Product_Id,
                name: editProduct.value.Name,
                productCategory_Id: 0,
                description: editProduct.value.Description || '',
            }
        }
    });

    onDeactivated(() => {
        product.value = { ...productTemplate.value };
        editProduct.value = { Product_Id: 0, CategoryName: null, Description: null, Name: '' };
        isNewProduct.value = false;
    });

    return {
        product,
        save: () => {
            if (isNewProduct.value) saveProduct();
            else updateProduct();
        }
    }
}