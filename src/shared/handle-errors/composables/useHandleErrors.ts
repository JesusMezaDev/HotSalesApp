import axios from 'axios';

import { useDialog } from '@/shared/dialog/composables';

export const useHandleErrors = () => {
    const dialog = useDialog();
    
    return {
        handleError: (error: any) => {
            if(axios.isAxiosError(error)) {
                console.error(error);
                dialog.set({ dialogType: 'error', message: error.message });
                dialog.show();
            }
            else {
                console.error(error);
                dialog.set({ dialogType: 'error', message: 'Ocurrió un error, intente más tarde.' });
                dialog.show();
            }

        }
    }
}