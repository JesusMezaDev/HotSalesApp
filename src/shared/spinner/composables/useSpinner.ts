import { storeToRefs } from 'pinia';
import { useSpinnerStore } from '../store/spinner.store';

export const useSpinner = () => {
    const { isLoading } = storeToRefs(useSpinnerStore());

    return {
        hideSpinner: (): void => { isLoading.value = false; },
        showSpinner: (): void => { isLoading.value = true; },
    }
}