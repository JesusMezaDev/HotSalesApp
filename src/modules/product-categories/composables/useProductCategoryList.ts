import hotSalesApi from '@/api/hotSalesApi';
import router from '@/router';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import { storeToRefs } from 'pinia';
import { useProductCategoryStore } from '@/modules/product-categories/store/productCategory.store';

export const useProductCategoryList  = () => {
    const { isNewProductcategory, editProductCategory, productCategoryListStore } = storeToRefs(useProductCategoryStore());
    const { hideSpinner, showSpinner } = useSpinner();
    const dialog = useDialog();
    const { handleError } = useHandleErrors();

    const getProductCategory = async (productCategoryId: number) => {
        showSpinner();
        try {
            const { data } = await hotSalesApi.get(`product-categories/${ productCategoryId }`);
            const { Ok, Data, Message } = data;

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message });
                dialog.show();
                return;
            }

            isNewProductcategory.value = false;
            editProductCategory.value = Data.ProductCategory[0];
            router.replace({ name: 'product-category'});
        } catch (error) {
            handleError(error);
        } finally {
            hideSpinner();
        }
    }

    const deleteProductCategory = async(productCategoryId: number) => {
        dialog.set({ dialogType: 'confirm', message: '¿Está seguro(a) de borrar la categoría del producto?',
            titleConfirm: 'Confirmar', labelOkButton: 'Si', labelCancelButton: 'No',
            onConfirmDialog: (): void => {
                confirmDeleteProductCategory(productCategoryId);
            }
        });
        dialog.show();
    }

    const confirmDeleteProductCategory = async(productCategoryId: number) => {
        showSpinner();
        try {
            const { data } = await hotSalesApi.delete(`product-categories/${ productCategoryId }`);
            const { Ok, Message, Data } = data;

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message});
                dialog.show();
                return;
            }

            productCategoryListStore.value = productCategoryListStore.value.filter(({ ProductCategory_Id }) => ProductCategory_Id !== productCategoryId);
        } catch (error) {
            handleError(error);
        }
        finally {
            hideSpinner();
        }
    }

    return {
        getProductCategory,
        deleteProductCategory,
    }
}