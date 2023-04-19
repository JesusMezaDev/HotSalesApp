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
import type { IProductCategory } from '@/modules/product-categories/interfaces/productCategory.interface';

export const useProduct = () => {
    const productTemplate = ref<IProductRequest>({
        name: '',
        description: '',
        productCategory_Id: 0,
    });
    const product = ref<IProductRequest>({ ...productTemplate.value });
    let productCategories = ref<IProductCategory[]>([]);
    const { editProduct, isNewProduct } = storeToRefs(useProductsStore());
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
            handleError(error);
        }
        finally {
            hideSpinner();
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
            handleError(error);
        }
        finally {
            hideSpinner();
        }
    }

    const getAllProductCategories = async() => {
        showSpinner();
        try {
            const { data } = await hotSalesApi.get<IGeneralInterface>(`/product-categories`);
            const { Ok, Message, Data } = data;

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                dialog.show();
                return;
            }

            productCategories.value =  <IProductCategory[]>[ ...Data.ProductCategories ];
        } catch (error) {
            handleError(error);
        }
        finally {
            hideSpinner();
        }
    }

    onActivated(() => {
        getAllProductCategories();

        if (editProduct.value) {
            product.value = {
                product_id: editProduct.value.Product_Id,
                name: editProduct.value.Name,
                productCategory_Id: editProduct.value.ProductCategory_Id || 0,
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
        productCategories,
        save: () => {
            if (isNewProduct.value) saveProduct();
            else updateProduct();
        }
    }
}