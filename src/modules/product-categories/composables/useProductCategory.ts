import { onActivated, onDeactivated, ref } from 'vue';

import hotSalesApi from '@/api/hotSalesApi';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import type { IProductCategory } from '@/modules/product-categories/interfaces/productCategory.interface';
import type { IProductCategoryRequest } from '@/modules/product-categories/interfaces/productCategoryRequest.interface';
import router from '@/router';
import { useProductCategoryStore } from '../store/productCategory.store';
import { storeToRefs } from 'pinia';
import type { IGeneralInterface } from '@/interfaces/generalResponse.interface';

export const useProductCategory = () => {
    const productCategoryTemplate = ref<IProductCategory>({
        ProductCategory_Id: 0,
        Name: '',
        Description: '',
    })
    const productCategory = ref<IProductCategory>(productCategoryTemplate.value);
    const { handleError } = useHandleErrors();
    const dialog = useDialog();
    const { hideSpinner, showSpinner } = useSpinner();
    const { editProductCategory, isNewProductcategory } = storeToRefs(useProductCategoryStore());

    const saveProductCategory = async () => {
        showSpinner();
        try {
            const { Name, Description } = productCategory.value;
            const productCategoryRequest: IProductCategoryRequest = {
                Name,
                Description
            };
            const { data } = await hotSalesApi.post('/product-categories', productCategoryRequest);
            const { Ok, Data, Message } = data;

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message });
                dialog.show();
                return;
            }

            dialog.set({ dialogType: 'success', message: 'La Categoría del Producto ha sido guardada correctamente.',
                onCloseDialog: () => {
                    router.replace({ name: 'product-categories' });
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

    const updateProductCategory = async() => {
        showSpinner();
        try {
            let productCategoryRequest: IProductCategoryRequest = productCategory.value;
            if (productCategory.value.ProductCategory_Id === 0) {
                const { ProductCategory_Id, ...rest } = productCategory.value;
                productCategoryRequest = rest;
            }
            
            const { data } = await hotSalesApi.patch<IGeneralInterface>(`/product-categories`, productCategoryRequest);
            const { Ok, Message, Data } = data;

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                dialog.show();
                return;
            }

            dialog.set({ dialogType: 'success', message: 'La categoría del producto se guardó correctamente.',
                onCloseDialog: (): void => {
                    router.replace({ name: 'product-categories' });
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

    onActivated(() => {
        if (editProductCategory.value) {
            const { ProductCategory_Id, Name, Description } = editProductCategory.value;
            productCategory.value = {
                ProductCategory_Id,
                Name,
                Description
            };
        }
    });

    onDeactivated(() => {
        productCategory.value = { ...productCategoryTemplate.value };
        editProductCategory.value = { ...productCategoryTemplate.value };
        isNewProductcategory.value = false;
    });

    return {
        productCategory,
        save: () => {
            if (isNewProductcategory.value) saveProductCategory();
            else updateProductCategory();
        }
    }
}