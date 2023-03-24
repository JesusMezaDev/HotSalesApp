<template>
    <div class="row m-2 align-items-center">
        <div class="col">
            <h3>
                <i class="bi-person-circle"></i>
                Clientes
            </h3>
        </div>
    </div>
    <div class="row m-2 align-items-center">
        <CustomerSearch />
    </div>
    <div class="row m-2">
        <CustomerCard v-for="customer in customerStore.customerStoreList" :customer-prop="customer"/>
    </div>
</template>

<script setup lang="ts">
    import CustomerCard from '@/modules/customers/components/CustomerCard.vue';
    import CustomerSearch from '@/modules/customers/components/CustomerSearchBar.vue';
    import { useCustomersStore } from '../store/customers.store';
    
    const customerStore = useCustomersStore();
</script>

<style scoped>

</style>