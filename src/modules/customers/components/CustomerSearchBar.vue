<template>
    <div class="row m-2 align-items-center">
        <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control" id="txtSearch" placeholder="Buscar" v-model="searchTerm" @keyup="searchKeyUp" maxlength="50">
                <label for="txtSearch">Buscar Cliente</label>
            </div>
        </div>
        <div class="col">
            <button class="btn btn-primary" @click="toNewCustomer">
                <i class="bi-person-add"></i>
                Agregar
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useCustomerSearchBar } from '../composables/useCustomerSearchBar';
    const { searchTerm, searchKeyUp, toNewCustomer } = useCustomerSearchBar();
</script>

<style scoped>

</style>