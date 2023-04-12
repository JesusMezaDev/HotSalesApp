import { onDeactivated, ref } from 'vue';

import axios from 'axios';

import type { IProductRequest } from '@/modules/products/interfaces/productRequest.interface';
import hotSalesApi from '@/api/hotSalesApi';
import router from '@/router';

export const useProduct = () => {
    const productTemplate = ref<IProductRequest>({
        name: '',
        description: '',
        productCategory_Id: null,
    });
    const product = ref<IProductRequest>({ ...productTemplate.value });

    const saveProduct = async() => {
        // const {
        //     name,
        //     description,
        //     productCategory_Id
        // } = product.value;
        try {
            const { data } = await hotSalesApi.post(`/products`, product.value);
            const { Ok, Message, Data } = data;
            
            router.replace({ name: 'products' });
        } catch (error) {
            if(axios.isAxiosError(error)) {
                console.error(error)
            }
            else {
                console.error('error');
            }
        }
    }

    onDeactivated(() => {
        console.log('Entró a onDeactivated');
        product.value = { ...productTemplate.value };
        console.log(product.value);
    });

    return {
        product,
        saveProduct,
    }
}