import hotSalesApi from '@/api/hotSalesApi';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';

export const useProductCategory = () => {
    const { handleError } = useHandleErrors();
    const dialog = useDialog();
    const { hideSpinner, showSpinner } = useSpinner();

    const saveProductCategory = async () => {
        showSpinner();
        try {
            const { data } = await hotSalesApi.post('productcategories', {});
        } catch (error) {
            handleError(error);
        }
    }

    return {

    }
}