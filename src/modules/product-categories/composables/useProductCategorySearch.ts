import hotSalesApi from '@/api/hotSalesApi';
import router from '@/router';
import { useDebouncer } from '@/shared/debouncer/composables/useDebouncer';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import { useProductCategoryStore } from '../store/productCategory.store';
import { storeToRefs } from 'pinia';
import { onActivated } from 'vue';

export const useProductCategorySearch = () => {
    const { isNewProductcategory, productCategoryListStore } = storeToRefs(useProductCategoryStore());
    const { handleError } = useHandleErrors();
    const dialog = useDialog();
    const { hideSpinner, showSpinner } = useSpinner();
    
    const searchProductCategory = async (value: string) => {
        if (value.trim().length === 0) {
            productCategoryListStore.value = [];
            return;
        }

        showSpinner();
        try {
            const { data } = await hotSalesApi.get(`product-categories/${ value }`);
            const { Ok, Data, Message } = data;

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message });
                dialog.show();
                return;
            }

            productCategoryListStore.value = [ ...Data.ProductCategories ];
        } catch (error) {
            handleError(error);
        } finally {
            hideSpinner();
        }
    }
    
    const { searchKeyUp, searchTerm } = useDebouncer(searchProductCategory);

    onActivated(() => {
        searchProductCategory(searchTerm.value)
    });

    return {
        searchTerm,
        searchKeyUp,
        addNewProductCategory: () => {
            isNewProductcategory.value = true,
            router.replace({ name: 'product-category' })
        },
    }
}