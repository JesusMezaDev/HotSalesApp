import hotSalesApi from '@/api/hotSalesApi';
import router from '@/router';
import { useDebouncer } from '@/shared/debouncer/composables/useDebouncer';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import { storeToRefs } from 'pinia';
import { useProductCategoryStore } from '@/modules/product-categories/store/productCategory.store';

export const useProductCategoryList  = () => {
    const { productCategoryListStore } = storeToRefs(useProductCategoryStore());
    const { hideSpinner, showSpinner } = useSpinner();
    const dialog = useDialog();
    const { handleError } = useHandleErrors();

    const getProductCategory = async (productCategoryId: number) => {
        showSpinner();
        try {
            const { data } = await hotSalesApi.get(`product-categories/${ productCategoryId }`);

        } catch (error) {
            handleError(error);
        } finally {
            hideSpinner();
        }
    }

    const deleteProductCategory = async (productCategoryId: number) => {
        showSpinner();
        try {
            const { data } = await hotSalesApi.delete(`product-categories/${ productCategoryId }`);

        } catch (error) {
            handleError(error);
        } finally {
            hideSpinner();
        }
    }

    return {
        getProductCategory,
        deleteProductCategory,
    }
}