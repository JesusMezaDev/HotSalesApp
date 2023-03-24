import { ref } from 'vue';

import axios from 'axios';

import hotSalesApi from '@/api/hotSalesApi';
import router from '@/router';

import type { ISettlement, IAddress, ISettlementsResponse } from '@/modules/customers/interfaces/settlementsResponse.interface';
import type { ICustomerRequest } from '@/modules/customers/interfaces/customerRequest.interface';

export const useCustomers = () => {
    const settlements = ref<ISettlement[]>();
    const address = ref<IAddress>();
    const customer = ref<ICustomerRequest>({
        annotations: undefined,
        birthDate: undefined,
        email: undefined,
        gender: '0',
        imageUrl: '/src/assets/NoImagePlaceholder.png',
        lastName: undefined,
        name: '',
        phone: undefined,
        settlement_Id: 0,
        streetAddress: undefined
    });
    

    const getAddress = async() => {
        const txtCP = <HTMLInputElement>document.getElementById('txtCP');

        if (txtCP.value.length != 5) return;

        const { Settlements, Address } = await getAddressFromDataBase(txtCP.value);
        address.value = Address[0];
        settlements.value = [...Settlements];
    }

    const getAddressFromDataBase = async(cp: string) => {
        const { data } = await hotSalesApi.get<ISettlementsResponse>(`/address/${ cp }`);
        const { Ok, Message, Data } = data;

        if (!Ok) {
            console.error(Message);
            return { Settlements: [], Address: []}
        }

        return Data;
    }

    const saveCustomer = async(e: Event) => {
        const {
            annotations,
            birthDate,
            email,
            gender,
            imageUrl,
            lastName,
            name,
            phone,
            settlement_Id,
            streetAddress
        } = customer.value;

        const customerRequest = {
            annotations: (annotations) ? annotations : null,
            birthDate: (birthDate) ? birthDate : null,
            email: (email) ? email : null,
            gender: (gender) ? gender : null,
            imageUrl: (imageUrl) ? imageUrl : null,
            lastName: (lastName) ? lastName : null,
            name,
            phone: (phone) ? phone : null,
            settlement_Id: (settlement_Id !== 0) ? settlement_Id : null,
            streetAddress: (streetAddress) ? streetAddress : null,
        };

        try {
            const { data } = await hotSalesApi.post(`/customers`, customerRequest);
            const { Ok, Message, Data } = data;
            
            if (Ok) {
                customer.value = {
                    annotations: undefined,
                    birthDate: undefined,
                    email: undefined,
                    gender: '0',
                    imageUrl: '/src/assets/NoImagePlaceholder.png',
                    lastName: undefined,
                    name: '',
                    phone: undefined,
                    settlement_Id: 0,
                    streetAddress: undefined
                }
                
                router.replace({ name: 'home' });
            }
        } catch (error) {
            if(axios.isAxiosError(error)) {
                console.error(error)
            }
            else {
                console.error('error');
            }
        }
    }

    return {
        address,
        customer,
        settlements,
        getAddress,
        saveCustomer,
    }
}