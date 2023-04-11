import { onDeactivated, ref } from 'vue';

import axios from 'axios';

import hotSalesApi from '@/api/hotSalesApi';
import router from '@/router';

import type { ISettlement, IAddress, ISettlementsResponse } from '@/modules/customers/interfaces/settlementsResponse.interface';
import type { ICustomerRequest } from '@/modules/customers/interfaces/customerRequest.interface';

export const useCustomers = () => {
    const codigopostal = ref<HTMLInputElement>();
    const settlements = ref<ISettlement[]>();
    const addressTemplate = ref<IAddress>({
        State_KeyCode: '',
        City_KeyCode: '',
        MunicipalityKeyCode: '',
        State_Name: '',
        City_Name: '',
        Municipality_Name: '',
    });
    const address = ref<IAddress>(addressTemplate.value);
    const customerTemplate = ref<ICustomerRequest>({
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
    const customer = ref<ICustomerRequest>(customerTemplate.value);

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
            
            returnHome();
        } catch (error) {
            if(axios.isAxiosError(error)) {
                console.error(error)
            }
            else {
                console.error('error');
            }
        }
    }

    const returnHome = () => {
        router.replace({ name: 'home' });
    }

    onDeactivated(() => {
        codigopostal.value!.value = '';
        customer.value = { ...customerTemplate.value };
        address.value = { ...addressTemplate.value };
    });

    return {
        address,
        customer,
        getAddress,
        returnHome,
        saveCustomer,
        settlements,
        codigopostal,
    }
}