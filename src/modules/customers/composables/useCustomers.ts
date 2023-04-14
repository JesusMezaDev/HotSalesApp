import { onDeactivated, ref } from 'vue';

import axios from 'axios';

import hotSalesApi from '@/api/hotSalesApi';
import router from '@/router';

import type { ISettlement, IAddress, ISettlementsResponse, IData } from '@/modules/customers/interfaces/settlementsResponse.interface';
import type { ICustomerRequest } from '@/modules/customers/interfaces/customerRequest.interface';
import { useDialog } from '@/shared/dialog/composables';
import { useHandleErrors } from '@/shared/handle-errors/composables/useHandleErrors';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';

export const useCustomers = () => {
    const postalCode = ref<HTMLInputElement>();
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
    const customer = ref<ICustomerRequest>({ ...customerTemplate.value });
    const dialog = useDialog();
    const { handleError } = useHandleErrors();
    const { hideSpinner, showSpinner } = useSpinner();

    const getAddress = async() => {
        const txtCP = <HTMLInputElement>document.getElementById('txtCP');

        if (txtCP.value.length != 5) return;

        try {
            const { Settlements, Address } = await getAddressFromDataBase(txtCP.value);
            address.value = Address[0];
            settlements.value = [...Settlements];
        } catch (error) {
            handleError(error);
        }
    }

    const getAddressFromDataBase = async(cp: string) => {
        showSpinner();
        try {
            const { data } = await hotSalesApi.get<ISettlementsResponse>(`/address/${ cp }`);
            const { Ok, Message, Data } = data;

            hideSpinner();

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                dialog.show();
                return { Settlements: [], Address: []}
            }
            
            return Data;    
        } catch (error) {
            hideSpinner();
            handleError(error);
            return { Settlements: [], Address: []}
        }
    }

    const saveCustomer = async() => {
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

        showSpinner();

        try {
            const { data } = await hotSalesApi.post(`/customers`, customerRequest);
            const { Ok, Message, Data } = data;
            
            hideSpinner();

            if (!Ok) {
                dialog.set({ dialogType: 'error', message: Message! });
                dialog.show();
                return;
            }

            dialog.set({ dialogType: 'success', message: 'Se guardó correctamente la información del cliente.',
                onCloseDialog: ():void => {
                    router.replace({ name: 'customers' });
                }
            });
            dialog.show();
        } catch (error) {
            hideSpinner();
            handleError(error);
        }
    }

    onDeactivated(() => {
        postalCode.value!.value = '';
        customer.value = { ...customerTemplate.value };
        address.value = { ...addressTemplate.value };
    });

    return {
        address,
        customer,
        getAddress,
        saveCustomer,
        settlements,
        postalCode,
    }
}