<template>
    <form @submit.prevent="saveCustomer">
        <div class="row">
            <div class="col">
                <div class="card m-3">
                    <h5 class="card-title m-2">Datos Generales</h5>
                    <div class="row m-2">
                        <div class="col-2">
                            <div class="card">
                                <img :src="customer.imageUrl" class="card-img-top p-1" :alt="customer.name">
                                <div class="card-body">
                                    <h6 class="card-title text-center">{{ customer.name }}</h6>
                                    <h6 class="card-title text-center">{{ customer.lastName }}</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row m-2">
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text w-150">Nombre(s)</span>
                                        <input type="text" class="form-control" placeholder="Nombre(s)" v-model="customer.name" @keydown.enter.prevent required>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text w-150">Appellido(s)</span>
                                        <input type="text" class="form-control" placeholder="Apellido(s)" v-model="customer.lastName" @keydown.enter.prevent>
                                    </div>
                                </div>
                            </div>
                            <div class="row m-2">
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text w-150">Email</span>
                                        <input type="email" class="form-control" placeholder="ejemplo@mail.com" v-model="customer.email" @keydown.enter.prevent>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text w-150">Fecha Nacimiento</span>
                                        <input type="date" class="form-control" v-model="customer.birthDate" @keydown.enter.prevent>
                                    </div>
                                </div>
                            </div>
                            <div class="row m-2">
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text w-150">Teléfono</span>
                                        <input type="tel" class="form-control" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="(667)-263-6187" v-model="customer.phone" @keydown.enter.prevent>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text w-150">Género</span>
                                        <select class="form-select" v-model="customer.gender">
                                            <option value="0">- Seleccione un elemento -</option>
                                            <option value="M">Masculino</option>
                                            <option value="F">Femenino</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row m-2">
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text w-150">Anotaciones</span>
                                        <textarea class="form-control" v-model="customer.annotations" rows="4"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card m-3">
                    <h5 class="card-title m-2">Domicilio</h5>
                    <div class="row m-2">
                        <div class="col">
                            <div class="input-group">
                                <span class="input-group-text w-150">Código Postal</span>
                                <input id="txtCP" type="number" class="form-control" placeholder="01000" @keydown.enter.prevent="getAddress" ref="postalCode">
                            </div>
                        </div>
                        <div class="col">
                            <button id="btn" class="btn btn-primary" @click.prevent="getAddress">
                                <i class="bi-search"></i>
                                Buscar
                            </button>
                        </div>
                    </div>
                    <div class="row m-2">
                        <div class="col">
                            <div class="input-group">
                                <span class="input-group-text w-150">Estado</span>
                                <input type="text" class="form-control" disabled :value="(address) ? address.State_Name : ''">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group">
                                <span class="input-group-text w-150">Municipio</span>
                                <input type="text" class="form-control" disabled :value="(address) ? address.Municipality_Name : ''">
                            </div>
                        </div>
                    </div>
                    <div class="row m-2">
                        <div class="col">
                            <div class="input-group">
                                <span class="input-group-text w-150">Ciudad</span>
                                <input type="text" class="form-control" disabled :value="(address) ? address.City_Name : ''">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group">
                                <span class="input-group-text w-150">Asentamientos</span>
                                <select class="form-select" v-model="customer.settlement_Id">
                                    <option value="0">- Seleccione un elemento -</option>
                                    <option v-for="settlement in settlements" :value="settlement.Settlement_Id" :key="settlement.Settlement_Id">{{ settlement.SettlementName }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row m-2">
                        <div class="col">
                            <div class="input-group">
                                <span class="input-group-text w-150">Calle y número</span>
                                <input type="text" class="form-control" v-model="customer.streetAddress" @keydown.enter.prevent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row m-2">
            <div class="col">
                <button type="button" class="btn btn-danger float-firts" @click="() => router.replace({ name: 'customers' })">
                    <i class="bi-x-circle"></i>
                    Cancelar
                </button>
            </div>
            <div class="col">
                <button type="submit" class="btn btn-success float-end">
                    <i class="bi-person-plus"></i>
                    Guardar
                </button>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
    import router from '@/router';
    import { useCustomers } from '@/modules/customers/composables';
    const {
        address,
        customer,
        settlements,
        getAddress,
        saveCustomer,
        postalCode,
    } = useCustomers();
</script>

<style scoped>
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* ::-webkit-calendar-picker-indicator {
        filter: invert(1);
    } */
</style>