import hotSalesApi from '@/api/hotSalesApi';
import router from '@/router';
import { useDebouncer } from '@/shared/debouncer/composables/useDebouncer';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';

export const useProductCategorySearch = () => {
    const { handleError } = useHandleErrors();
    const dialog = useDialog();
    const { hideSpinner, showSpinner } = useSpinner();
    
    const searchProductCategory = async () => {
        showSpinner();
        try {
            const { data } = await hotSalesApi.get('');
        } catch (error) {
            handleError(error);
        } finally {
            hideSpinner();
        }
    }

    const deleteProductCategory = async () => {
        showSpinner();
        try {
            const { data } = await hotSalesApi.delete('');
        } catch (error) {
            handleError(error);
        } finally {
            hideSpinner();
        }
    }
    
    const { searchKeyUp, searchTerm } = useDebouncer(searchProductCategory);

    return {
        searchTerm,
        searchKeyUp,
        addNewProductCategory: () => router.replace({ name: 'product-category' }),
    }

    return {}
}